package scouting

import (
	"fmt"
	"io"
	"net/http"
	"strings"
)

func Scout(location string, objective string) (bool, error) {
	fmt.Println("Sending GET request")
	response, err := http.Get(location)
	if err != nil {
		fmt.Println(err.Error())
		return false, err
	}

	fmt.Println("Request suceeded")

	defer response.Body.Close()

	if response.StatusCode == http.StatusOK {
		fmt.Println("Status code OK")
		bodyBytes, err := io.ReadAll(response.Body)
		if err != nil {
			return false, err
		}
		bodyString := string(bodyBytes)
		fmt.Println(bodyString)

		if strings.Contains(bodyString, objective) {
			fmt.Printf("It is a match with objective %s\n", objective)

			return true, nil
		}
		return false, nil
	}
	fmt.Println("Status code not OK, returning")

	return false, nil
}
