/*
Copyright © 2025 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/spf13/cobra"
	"github.com/adaviloper/advent-of-code/aoc/internal"
)

// buildCmd represents the build command
var buildCmd = &cobra.Command{
    Use:   "build",
    Short: "Create today's AoC directory and data.ts",
    Long:  "Creates 2024/<DD>/ and writes data.ts with Advent of Code input using AOC_SESSION.",
    Args: cobra.MaximumNArgs(1),
    RunE: func(cmd *cobra.Command, args []string) error {
        year := time.Now().Year()
        day, err := internal.GetDayForPuzzle(args)
        if err != nil {
        	return err
        }

        // Resolve base directory for year 2024
        yearDir, err := resolveYearRootDirectory(2024)
        if err != nil {
            return err
        }

        // Create day directory (01-25)
        dayDir := filepath.Join(yearDir, fmt.Sprintf("%02d", day))
        if err := os.MkdirAll(dayDir, 0o755); err != nil {
            return fmt.Errorf("failed to create day directory %s: %w", dayDir, err)
        }

        dataFilePath := filepath.Join(dayDir, "data.ts")
        if fileExists(dataFilePath) {
            // If it exists, do not overwrite to avoid losing edits
            fmt.Printf("data.ts already exists at %s, skipping.\n", dataFilePath)
        } else {
            // Fetch input from Advent of Code
            session := os.Getenv("AOC_SESSION")
            if strings.TrimSpace(session) == "" {
                return errors.New("AOC_SESSION environment variable is not set. Get your session cookie from adventofcode.com and set AOC_SESSION")
            }

            input, err := fetchAocInput(2024, day, session)
            if err != nil {
                return err
            }

            if err := writeTsDataFile(dataFilePath, input); err != nil {
                return err
            }
            fmt.Printf("Wrote %s\n", dataFilePath)
        }

        // Also create a test.ts file with an empty string if it doesn't exist
        testFilePath := filepath.Join(dayDir, "test.ts")
        if fileExists(testFilePath) {
            fmt.Printf("test.ts already exists at %s, skipping.\n", testFilePath)
        } else {
            if err := writeEmptyTsDataFile(testFilePath); err != nil {
                return err
            }
            fmt.Printf("Wrote %s\n", testFilePath)
        }

        // Also create a test.ts file with an empty string if it doesn't exist
        puzzleFilePath01 := filepath.Join(dayDir, "01.ts")
        if fileExists(puzzleFilePath01) {
            fmt.Printf("01.ts already exists at %s, skipping.\n", puzzleFilePath01)
        } else {
            if err := writeEmptyPuzzleFile(puzzleFilePath01, year, day); err != nil {
                return err
            }
            fmt.Printf("Wrote %s\n", puzzleFilePath01)
        }

        // Also create a test.ts file with an empty string if it doesn't exist
        puzzleFilePath02 := filepath.Join(dayDir, "02.ts")
        if fileExists(puzzleFilePath02) {
            fmt.Printf("02.ts already exists at %s, skipping.\n", puzzleFilePath02)
        } else {
            if err := writeEmptyPuzzleFile(puzzleFilePath02, year, day); err != nil {
                return err
            }
            fmt.Printf("Wrote %s\n", puzzleFilePath02)
        }
        
        return nil
    },
}

func init() {
	rootCmd.AddCommand(buildCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// buildCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// buildCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}

// resolveYearRootDirectory tries to locate the year directory (e.g., 2024) either
// in the current working directory or in the parent if running from the aoc CLI subfolder.
// If it doesn't exist, it will be created in the most reasonable place.
func resolveYearRootDirectory(year int) (string, error) {
    cwd, err := os.Getwd()
    if err != nil {
        return "", fmt.Errorf("failed to get working directory: %w", err)
    }

    yearName := fmt.Sprintf("%d", year)

    // Prefer ./<year> if it exists
    candidate := filepath.Join(cwd, yearName)
    if dirExists(candidate) {
        return candidate, nil
    }

    // Otherwise, create ./<year>
    if err := os.MkdirAll(candidate, 0o755); err != nil {
        return "", fmt.Errorf("failed to create year directory %s: %w", candidate, err)
    }
    return candidate, nil
}

func dirExists(path string) bool {
    info, err := os.Stat(path)
    if err != nil {
        return false
    }
    return info.IsDir()
}

func fileExists(path string) bool {
    info, err := os.Stat(path)
    if err != nil {
        return false
    }
    return !info.IsDir()
}

// fetchAocInput downloads the Advent of Code input for the given year and day
// using the provided session cookie value.
func fetchAocInput(year int, day int, session string) (string, error) {
    // url := fmt.Sprintf("https://adventofcode.com/%d/day/%d/input", year, day)
    url := fmt.Sprintf("https://adventofcode.com/2024/day/%d/input", day)

    req, err := http.NewRequest(http.MethodGet, url, nil)
    if err != nil {
        return "", fmt.Errorf("failed to create request: %w", err)
    }
    req.Header.Set("Cookie", "session="+session)
    req.Header.Set("User-Agent", "aoc-cli (+https://adventofcode.com)")

    client := &http.Client{Timeout: 30 * time.Second}
    resp, err := client.Do(req)
    if err != nil {
        return "", fmt.Errorf("failed to fetch input: %w", err)
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        // Read at most some bytes to include in error for debugging
        body, _ := io.ReadAll(io.LimitReader(resp.Body, 2048))
        return "", fmt.Errorf("unexpected status %d from AoC. Body: %s", resp.StatusCode, strings.TrimSpace(string(body)))
    }

    bytes, err := io.ReadAll(resp.Body)
    if err != nil {
        return "", fmt.Errorf("failed to read input body: %w", err)
    }
    return string(bytes), nil
}

// writeTsDataFile writes a TypeScript module exporting the input as a template literal.
func writeTsDataFile(path string, input string) error {
    // Escape backticks and prevent template interpolation
    escaped := strings.ReplaceAll(input, "`", "\\`")
    escaped = strings.ReplaceAll(escaped, "${", "\\${")

    content := fmt.Sprintf("export const data = `\n%s`\n", escaped)

    if err := os.WriteFile(path, []byte(content), 0o644); err != nil {
        return fmt.Errorf("failed to write %s: %w", path, err)
    }
    return nil
}

// writeEmptyTsDataFile writes a TypeScript module exporting an empty string.
func writeEmptyTsDataFile(path string) error {
    content := "export const data = ``;\n"
    if err := os.WriteFile(path, []byte(content), 0o644); err != nil {
        return fmt.Errorf("failed to write %s: %w", path, err)
    }
    return nil
}

func writeEmptyPuzzleFile(path string, year int, day int) error {
	content := fmt.Sprintf(`
	/**
	 * https://adventofcode.com/%d/day/%d
	 */

	import { data } from './data';
	import { test } from './test';
	import { utils } from '../../../utils';

	const main = () => {
	  return 'get to work';
	};

	console.log(main());
	`, year, day)

    if err := os.WriteFile(path, []byte(content), 0o644); err != nil {
        return fmt.Errorf("failed to write %s: %w", path, err)
    }
    return nil
}
