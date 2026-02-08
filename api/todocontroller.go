package api

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

type TodoItem struct {
	gorm.Model
	Objective string    `json:"objective"`
	Priority  int       `json:"priority"`
	Done      bool      `json:"done"`
	Created   time.Time `json:"created"`
	Id        uuid.UUID `json:"íd"`
}

func (td *TodoItem) toggle() {
	td.Done = !td.Done
}

func (s *Server) addTodoRoutes() {
	s.HandleFunc("/api/todo", s.createTodoItem()).Methods("POST")
	s.HandleFunc("/api/todo/{id}", s.editTodoItem()).Methods("PUT")
	s.HandleFunc("/api/todo/list", s.listTodoItems()).Methods("GET")
	s.HandleFunc("/api/todo/{id}", s.getTodoItem()).Methods("GET")
	s.HandleFunc("/api/todo/{id}", s.deleteTodoItem()).Methods("DELETE")
	s.HandleFunc("/api/todo/{id}/toggle", s.toggleTodoItem()).Methods("POST")
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

func (s *Server) editTodoItem() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var todoItem TodoItem

		idStr, _ := mux.Vars(r)["id"]
		id, err := strconv.ParseUint(idStr, 10, 32)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
		}

		if err := json.NewDecoder(r.Body).Decode(&todoItem); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		_, err = gorm.G[TodoItem](s.db).Where("id = ?", id).Updates(s.ctx, todoItem)

		if err := json.NewDecoder(r.Body).Decode(&todoItem); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
		}
	}
}

func (s *Server) getTodoItem() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		idStr, _ := mux.Vars(r)["id"]
		id, err := strconv.ParseUint(idStr, 10, 32)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
		}

		todoItem, err := gorm.G[TodoItem](s.db).Where("id = ?", id).First(s.ctx)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}

		w.Header().Set("Content-Type", "application/json")

		if err := json.NewEncoder(w).Encode(todoItem); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}

func (s *Server) deleteTodoItem() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		idStr, _ := mux.Vars(r)["id"]
		id, err := strconv.ParseUint(idStr, 10, 32)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
		}

		_, err = gorm.G[TodoItem](s.db).Where("id = ?", id).Delete(s.ctx)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	}
}

func (s *Server) listTodoItems() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		todoItems, err := gorm.G[TodoItem](s.db).Find(s.ctx)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}

		w.Header().Set("Content-Type", "application/json")

		if err := json.NewEncoder(w).Encode(todoItems); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

	}
}

func (s *Server) toggleTodoItem() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		idStr, _ := mux.Vars(r)["id"]
		id, err := strconv.ParseUint(idStr, 10, 32)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
		}

		todoItem, err := gorm.G[TodoItem](s.db).Where("id = ?", id).First(s.ctx)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
		}

		todoItem.toggle()

		_, err = gorm.G[TodoItem](s.db).Where("id = ?", id).Update(s.ctx, "active", todoItem.Done)

		if err := json.NewEncoder(w).Encode(todoItem); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}
