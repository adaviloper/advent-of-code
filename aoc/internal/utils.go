/*
Copyright © 2025 NAME HERE <EMAIL ADDRESS>
*/
package internal

import (
	"fmt"
	"os"
	"strconv"
	"time"
)

// GetDateForPuzzle returns today's day of month clamped to the AoC range [1, 25].
func GetDateForPuzzle(args []string) (int, int, error) {
    year := time.Now().Year()
    if year == 2025 {
        year = 2024
    }
    day := time.Now().Day()

	if len(args) == 0 {
		return year, day, nil
	}
    minYear := 2020

    a, errA := strconv.Atoi(args[0])
  	if errA != nil {
    	return 0, 0, fmt.Errorf("invalid day %q: %w", a, errA)
  	}

	// override if positional arg provided
    if len(args) == 1 {
        if a > 25 {
            year = a
        } else {
            day = a
        }

  	    if year < minYear {
    	    return 0, 0, fmt.Errorf("year must be greater than %d, received %d", minYear, year)
  	    }

  	    if day < 1 || day > 25 {
    	    return 0, 0, fmt.Errorf("day must be between 1 and 25, received %d", day)
  	    }
    }

    if len(args) == 2 {
        b, errB := strconv.Atoi(args[1])
  	    if errB != nil {
    	    return 0, 0, fmt.Errorf("invalid day %q: %w", b, errB)
  	    }
        year = a
        day = b

  	    if year < minYear {
    	    return 0, 0, fmt.Errorf("year must be greater than %d, received %d", minYear, year)
  	    }
  	    if day < 1 || day > 25 {
    	    return 0, 0, fmt.Errorf("day must be between 1 and 25, received %d", day)
  	    }
    }

    return year, day, nil
}

func DirExists(path string) bool {
    info, err := os.Stat(path)
    if err != nil {
        return false
    }
    return info.IsDir()
}

func FileExists(path string) bool {
    info, err := os.Stat(path)
    if err != nil {
        return false
    }
    return !info.IsDir()
}

