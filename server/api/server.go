package api

import (
	"context"
	"encoding/json"
	"main/scouting"
	"net/http"
	"strconv"
	"time"

	"github.com/glebarez/sqlite"
	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

// ScoutingErrand type is the model type for the errand to be performed
type ScoutingErrand struct {
	gorm.Model
	Location  string    `json:"location"`
	Objective string    `json:"objective"`
	Interval  int       `json:"interval"`
	Active    bool      `json:"active"`
	Created   time.Time `json:"created"`
	JobID     uuid.UUID
}

// Server type is the type containing server logic
type Server struct {
	*mux.Router

	errands []ScoutingErrand
}

var db, err = gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
var ctx = context.Background()

// NewServer function creates a new server instance
func NewServer() *Server {
	s := &Server{
		Router:  mux.NewRouter(),
		errands: []ScoutingErrand{},
	}
	s.routes()

	return s
}

func (s *Server) routes() {
	s.HandleFunc("/api/scouting-errand", s.createScoutingErrand()).Methods("POST")
	s.HandleFunc("/api/scouting-errand/{id}", s.editScoutingErrand()).Methods("PUT")
	s.HandleFunc("/api/scouting-errand/list", s.listScoutingErrands()).Methods("GET")
	s.HandleFunc("/api/scouting-errand/{id}", s.getScoutingErrand()).Methods("GET")
	s.HandleFunc("/api/scouting-errand/{id}", s.deleteScoutingErrand()).Methods("DELETE")
}

func (s *Server) createScoutingErrand() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var scoutingErrand ScoutingErrand
		if err := json.NewDecoder(r.Body).Decode(&scoutingErrand); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		// handle active jobs
		jobID, err := scouting.AddScoutingJob(scoutingErrand.Location, scoutingErrand.Objective, scoutingErrand.Interval)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}

		scoutingErrand.JobID = jobID

		if res := db.Create(&scoutingErrand); res.Error != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}

		w.Header().Set("Content-Type", "application/json")

		if err := json.NewEncoder(w).Encode(scoutingErrand); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}

func (s *Server) editScoutingErrand() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var scoutingErrand ScoutingErrand

		idStr, _ := mux.Vars(r)["id"]
		id, err := strconv.ParseUint(idStr, 10, 32)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
		}

		if err := json.NewDecoder(r.Body).Decode(&scoutingErrand); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		_, err = gorm.G[ScoutingErrand](db).Where("id = ?", id).Updates(ctx, scoutingErrand)
		scouting.EditScoutingJob(scoutingErrand.JobID, scoutingErrand.Location, scoutingErrand.Objective, scoutingErrand.Interval)

		if err := json.NewDecoder(r.Body).Decode(&scoutingErrand); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
		}

	}
}

func (s *Server) getScoutingErrand() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		idStr, _ := mux.Vars(r)["id"]
		id, err := strconv.ParseUint(idStr, 10, 32)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
		}

		scoutingErrand, err := gorm.G[ScoutingErrand](db).Where("id = ?", id).First(ctx)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}

		w.Header().Set("Content-Type", "application/json")

		if err := json.NewEncoder(w).Encode(scoutingErrand); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

	}
}

func (s *Server) deleteScoutingErrand() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		idStr, _ := mux.Vars(r)["id"]
		id, err := strconv.ParseUint(idStr, 10, 32)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
		}

		scoutingErrand, err := gorm.G[ScoutingErrand](db).Where("id = ?", id).First(ctx)
		err = scouting.RemoveScoutingJob(scoutingErrand.JobID)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}

		_, err = gorm.G[ScoutingErrand](db).Where("id = ?", id).Delete(ctx)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}

		w.Header().Set("Content-Type", "application/json")

		if err := json.NewEncoder(w).Encode(scoutingErrand); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

	}
}

func (s *Server) listScoutingErrands() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		scoutingErrands, err := gorm.G[ScoutingErrand](db).Find(ctx)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}

		w.Header().Set("Content-Type", "application/json")

		if err := json.NewEncoder(w).Encode(scoutingErrands); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

	}
}
