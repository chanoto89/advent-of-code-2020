package main

import (
	"fmt"
	"inputreader"
	"regexp"
	"strconv"
	"strings"
)

func main() {
	fmt.Println("Day 2 in GO")
	var input []string = inputreader.ParseFile("go/src/day2/input.json")
	var part1Result []string = getPart1Passwords(input)
	fmt.Println("Part 1 valid passwords: ", len(part1Result))
	var part2Result []string = getPart2Passwords(input)
	fmt.Println("Part 1 valid passwords: ", len(part2Result))
}

func getPart1Passwords(input []string) []string {
	var validPasswords []string

	for i := 0; i < len(input); i++ {
		var line string = input[i]
		line = strings.Replace(line, ":", "", 1)
		lineSplit := strings.Split(line, " ")
		count, value, password := lineSplit[0], lineSplit[1], lineSplit[2]
		countSplit := strings.Split(count, "-")
		countA, err := strconv.Atoi(countSplit[0])
		countB, err := strconv.Atoi(countSplit[1])

		if err != nil {
			fmt.Println(err) // Dunno what to do here
		}

		r := regexp.MustCompile(value)
		occurrences := r.FindAllString(password, -1)
		occurrenceLength := len(occurrences)

		if occurrenceLength >= countA && occurrenceLength <= countB {
			validPasswords = append(validPasswords, password)
		}
	}

	return validPasswords
}

func getPart2Passwords(input []string) []string {
	var validPasswords []string

	for i := 0; i < len(input); i++ {
		var line string = input[i]
		line = strings.Replace(line, ":", "", 1)
		lineSplit := strings.Split(line, " ")
		positions, value, password := lineSplit[0], lineSplit[1], lineSplit[2]
		positionsSplit := strings.Split(positions, "-")
		positionA, err := strconv.Atoi(positionsSplit[0])
		positionB, err := strconv.Atoi(positionsSplit[1])

		if err != nil {
			fmt.Println("PARSING ERROR")
			fmt.Println(err) // Dunno what to do here
		}
		positionAMatch := string(password[positionA-1]) == value
		positionBMatch := string(password[positionB-1]) == value

		if (positionAMatch && !positionBMatch) || (!positionAMatch && positionBMatch) {
			validPasswords = append(validPasswords, password)
		}
	}

	return validPasswords
}
