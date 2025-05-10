package routes

import (
	"backend/handlers"
	"backend/repositories"
	"backend/services"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterTasksRoutes(rootRouter *gin.Engine, db *gorm.DB) {
	taskRouter := rootRouter.Group("/tasks")
	taskRepository := repositories.NewTasksRepository(db)
	taskService := services.NewTasksService(taskRepository)
	taskHandler := handlers.NewTaskHandler(taskService)
	taskHandler.RegisterRoutes(taskRouter)
}
