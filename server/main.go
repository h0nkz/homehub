package main

import (
	"fmt"
	"net/http"

	"main/api"

	"gorm.io/gorm"
)

type Post struct {
	gorm.Model
	Title string
	Slug  string `gorm:"uniqueIndex:idx_slug"`
	Likes uint
}

func (p Post) String() string {
	return fmt.Sprintf("Post Title: %s, Slug: %s", p.Title, p.Slug)
}

//var db, err = gorm.Open(sqlite.Open("test.db"), &gorm.Config{})

func main() {
	server := api.NewServer()
	http.ListenAndServe(":8080", server)
}

/*
func createPost(title string, slug string) Post {
	newPost := Post{Title: title, Slug: slug}
	if res := db.Create(&newPost); res.Error != nil {
		panic(res.Error)
	}

	return newPost
}

func getPost(slug string) Post {
	targetPost := Post{Slug: slug}
	if res := db.First(&targetPost); res.Error != nil {
		panic(res.Error)
	}

	return targetPost
}
*/
