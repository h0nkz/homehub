package api

import (
	"encoding/json"
	"net/http"
	"time"

	"gorm.io/gorm"
)

type TodoItem struct {
	gorm.Model
	Objective string `json:"objective"`
	Priority  int    `json:"priority"`
	Done      bool   `json:"done"`
	Created   time.Time
}

func (s *Server) addTodoRoutes() {
	s.HandleFunc("/api/todo", s.createTodoItem()).Methods("POST")
}

func (s *Server) createTodoItem() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var todoItem TodoItem
		if err := json.NewDecoder(r.Body).Decode(&todoItem); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		if res := s.db.Create(&todoItem); res.Error != nil {
			http.Error(w, res.Error.Error(), http.StatusInternalServerError)
		}

		w.Header().Set("Content-Type", "application/json")

		if err := json.NewEncoder(w).Encode(todoItem); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}
