package api

import (
	"context"
	"encoding/json"
	"main/scouting"
	"net/http"
	"strconv"
	"time"

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
}

func (se *ScoutingErrand) toggle() {
	se.Active = !se.Active
}

// Server type is the type containing server logic
type Server struct {
	*mux.Router

	errandJobMap map[uint]uuid.UUID
	db           *gorm.DB
	ctx          context.Context
}

// NewServer function creates a new server instance
func NewServer(db *gorm.DB, ctx context.Context) *Server {
	s := &Server{
		Router:       mux.NewRouter(),
		errandJobMap: make(map[uint]uuid.UUID),
		db:           db,
		ctx:          ctx,
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
	s.HandleFunc("/api/scouting-errand/{id}/toggle", s.toggleScoutingErrand()).Methods("POST")
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

		if res := s.db.Create(&scoutingErrand); res.Error != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}

		s.errandJobMap[scoutingErrand.ID] = jobID
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

		_, err = gorm.G[ScoutingErrand](s.db).Where("id = ?", id).Updates(s.ctx, scoutingErrand)
		jobID, OK := s.errandJobMap[scoutingErrand.ID]

		if !OK {
			http.Error(w, "No job ID was found linked to the errand", http.StatusBadRequest)
		}

		scouting.EditScoutingJob(jobID, scoutingErrand.Location, scoutingErrand.Objective, scoutingErrand.Interval)

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

		scoutingErrand, err := gorm.G[ScoutingErrand](s.db).Where("id = ?", id).First(s.ctx)
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

		jobID, OK := s.errandJobMap[uint(id)]

		if !OK {
			http.Error(w, "No job ID was found linked to the errand", http.StatusBadRequest)
		}
		err = scouting.RemoveScoutingJob(jobID)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}

		delete(s.errandJobMap, uint(id))

		_, err = gorm.G[ScoutingErrand](s.db).Where("id = ?", id).Delete(s.ctx)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	}
}

func (s *Server) listScoutingErrands() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		scoutingErrands, err := gorm.G[ScoutingErrand](s.db).Find(s.ctx)
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

func (s *Server) toggleScoutingErrand() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		idStr, _ := mux.Vars(r)["id"]
		id, err := strconv.ParseUint(idStr, 10, 32)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
		}

		scoutingErrand, err := gorm.G[ScoutingErrand](s.db).Where("id = ?", id).First(s.ctx)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
		}

		scoutingErrand.toggle()

		if scoutingErrand.Active {
			jobID, err := scouting.AddScoutingJob(scoutingErrand.Location, scoutingErrand.Objective, scoutingErrand.Interval)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
			}
			s.errandJobMap[scoutingErrand.ID] = jobID
		} else {
			jobID, OK := s.errandJobMap[uint(id)]

			if !OK {
				http.Error(w, "No job ID was found linked to the errand", http.StatusBadRequest)
			}
			scouting.RemoveScoutingJob(jobID)
			delete(s.errandJobMap, scoutingErrand.ID)
		}
		_, err = gorm.G[ScoutingErrand](s.db).Where("id = ?", id).Update(s.ctx, "active", scoutingErrand.Active)

		if err := json.NewEncoder(w).Encode(scoutingErrand); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}
