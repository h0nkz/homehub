package api

import (
	"context"
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
	s.addScoutingRoutes()
}
