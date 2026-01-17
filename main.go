package main

import (
	"context"
	"main/api"
	"net/http"

	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
)

func main() {
	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})

	if err != nil {
		panic(err.Error())
	}

	// dir := http.Dir("../")
	server := api.NewServer(db, context.Background())
	http.ListenAndServe(":8080", server)
}
