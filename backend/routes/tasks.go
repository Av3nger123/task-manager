package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func RegisterTaskRoutes(root_router *gin.Engine) {
	root_router.GET("/tasks", getTasksHandler)
	root_router.POST("/tasks", postTasksHandler)
	root_router.PUT("/tasks/:id", putTaskHandler)
	root_router.DELETE("/tasks/:id", deleteTaskHandler)
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
