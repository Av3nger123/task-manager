package routes

import (
	"backend/handlers"

	"github.com/gin-gonic/gin"
)

func RegisterHealthRoutes(rootRouter *gin.Engine) {
	healthRouter := rootRouter.Group("/health")
	healthHandler := handlers.NewHealthHandler()
	healthHandler.RegisterRoutes(healthRouter)
}
