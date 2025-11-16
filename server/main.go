package main

import (
	"main/api"
	"net/http"
)

func main() {
	server := api.NewServer()
	http.ListenAndServe(":8080", server)
}
