package routes

import (
	"backend/handlers"
	"backend/repositories"
	"backend/services"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterAuthRoutes(rootRouter *gin.Engine, db *gorm.DB) {
	userRepository := repositories.NewUserRepository(db)
	userService := services.NewUserService(userRepository)
	authRouter := rootRouter.Group("/auth")
	authHandler := handlers.NewAuthHandler(userService)
	authHandler.RegisterRoutes(authRouter)
}
