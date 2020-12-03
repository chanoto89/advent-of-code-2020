package inpututils

import (
	"fmt"
)

// ParseFile must be Exported, Capitalized, and comment added.
func ParseFile(path string) {
	// // read file
	// data, err := ioutil.ReadFile(path)
	// if err != nil {
	// 	fmt.Print(err)
	// }

	// // define data structure
	// type DayPrice struct {
	// 	USD float32
	// 	EUR float32
	// 	GBP float32
	// }

	// // json data
	// var obj []string

	// // unmarshall it
	// err = json.Unmarshal(data, &obj)
	// if err != nil {
	// 	fmt.Println("error:", err)
	// }

	// return obj

	fmt.Println("Hello from input reader")
}
