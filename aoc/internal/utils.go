/*
Copyright © 2025 NAME HERE <EMAIL ADDRESS>
*/

package internal

import (
	"fmt"
	"strconv"
	"time"
)

// GetDayForPuzzle returns today's day of month clamped to the AoC range [1, 25].
func GetDayForPuzzle(args []string) (int, error) {
    day := time.Now().Day()
	// override if positional arg provided
	if len(args) > 0 {
  		parsed, err := strconv.Atoi(args[0])
  		if err != nil {
    		return 0, fmt.Errorf("invalid day %q: %w", args[0], err)
  		}

  		if parsed < 1 || parsed > 25 {
    		return 0, fmt.Errorf("day must be between 1 and 25, got %d", parsed)
  		}
  		day = parsed
	}

    return day, nil
}

