package api

import (
	"context"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

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
	s.addTodoRoutes()
}
