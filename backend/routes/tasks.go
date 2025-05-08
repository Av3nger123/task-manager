package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func RegisterTaskRoutes(root_router *gin.Engine) {
	task_router := root_router.Group("/tasks")
	task_router.GET("", getTasksHandler)
	task_router.POST("", postTasksHandler)
	task_router.PUT("/:id", putTaskHandler)
	task_router.DELETE("/:id", deleteTaskHandler)
}

func getTasksHandler(ctx *gin.Context) {
	ctx.String(http.StatusOK, "Tasks")
}

func postTasksHandler(ctx *gin.Context) {
	ctx.String(http.StatusOK, "Tasks")
}

func putTaskHandler(ctx *gin.Context) {
	ctx.String(http.StatusOK, "Tasks")
}

func deleteTaskHandler(ctx *gin.Context) {
	ctx.String(http.StatusOK, "Tasks")
}
