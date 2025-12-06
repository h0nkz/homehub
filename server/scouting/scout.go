package scouting

import (
	"fmt"
	"io"
	"net/http"
	"strings"
)

func Scout(location string, objective string) (bool, error) {
	if err := validateInput(location, objective); err != nil {
		fmt.Println(err.Error())
		return false, err
	}

	fmt.Println("Sending GET request")
	response, err := http.Get(location)
	if err != nil {
		fmt.Println(err.Error())
		return false, err
	}

	fmt.Println("Request suceeded")

	defer response.Body.Close()

	switch response.StatusCode {
	case http.StatusOK:
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
	case http.StatusNotFound:
		return false, fmt.Errorf("Request to %s was not found", location)
	}

	fmt.Println("Status code not OK, returning")

	return false, nil
}

func validateInput(location string, objective string) error {
	if location == "" {
		return fmt.Errorf("Validate Input Error: Location is empty")
	}
	if objective == "" {
		return fmt.Errorf("Validate Input Error: Objective is empty")
	}

	return nil
}
