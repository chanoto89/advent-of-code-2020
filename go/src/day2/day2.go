package main

import (
	"fmt"

	"inputreader"
)

func main() {
	fmt.Println("Hello, World!")
	obj := inputreader.ParseFile("go/src/day2/input.json")
	fmt.Println("OBJ: ", obj[0])
}
