/*
Copyright © 2025 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"fmt"
	"os/exec"
	// "os/exec"
	// "time"

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
		// year := time.Now().Year();
		year := 2024;
		day, err := internal.GetDayForPuzzle(args);
		if err != nil {
			return err
		}

		fmt.Printf("%d/%02d/%02d.ts", year, day, day)

		command := exec.Command("deno", fmt.Sprintf("%d/%02d/01.ts", year, day));
		output, err := command.Output();
		if err != nil {
			return err
		}
		fmt.Printf("%s", output)

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
