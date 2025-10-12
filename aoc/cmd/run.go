/*
Copyright © 2025 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"fmt"
	"os/exec"

	"github.com/adaviloper/advent-of-code/aoc/internal"
	"github.com/spf13/cobra"
)

// runCmd represents the run command
var runCmd = &cobra.Command{
	Use:   "run",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	RunE: func(cmd *cobra.Command, args []string) error {
		year, day, err := internal.GetDateForPuzzle(args);
		if err != nil {
			return err
		}

		runPuzzleSection(year, day)

		return nil
	},
}

func init() {
	rootCmd.AddCommand(runCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// runCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// runCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}

func runPuzzleSection(year int, day int) error {
	filePath := fmt.Sprintf("%s/%d/%02d/main.ts", cfg.BaseDirectory, year, day)
	if !internal.FileExists(filePath) {
		fmt.Printf("[%s] does not exist\n", filePath)
		return fmt.Errorf("[%s] does not exist\n", filePath)
	}

	command := exec.Command("deno", filePath);
	output, err := command.Output();
	if err != nil {
		fmt.Print(err.Error())
		return err
	}

	fmt.Printf("Results for December %d, %d:\n", day, year)
	fmt.Printf("%s\n", output)

	return nil
}
