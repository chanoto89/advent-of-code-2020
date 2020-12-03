package inputreader

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
)

// ParseFile must be Exported, Capitalized, and comment added.
func ParseFile(path string) []string {
	// read file
	data, err := ioutil.ReadFile(path)
	if err != nil {
		fmt.Print(err)
	}

	// json data
	var obj []string

	// unmarshall it
	err = json.Unmarshal(data, &obj)
	if err != nil {
		fmt.Println("error:", err)
	}

	return obj
}
