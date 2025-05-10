package handlers

import (
	"backend/models"
	"backend/services"
	"backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type TasksHandler struct {
	tasksService *services.TasksService
}

func (this *TasksHandler) RegisterRoutes(router *gin.RouterGroup) {
	router.GET("", this.getTasksHandler)
	router.POST("", this.postTasksHandler)
	router.PUT("/:id", this.putTaskHandler)
	router.DELETE("/:id", this.deleteTaskHandler)
}

func (this *TasksHandler) getTasksHandler(ctx *gin.Context) {

	var taskFilter models.GetTaskQuery
	if err := ctx.ShouldBindQuery(&taskFilter); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	tasks, total, err := this.tasksService.GetTasks(taskFilter)
	if err != nil {
		ctx.String(http.StatusInternalServerError, "Failed to fetch tasks")
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"data": tasks, "meta": gin.H{"total": total}})
}

func (this *TasksHandler) postTasksHandler(ctx *gin.Context) {
	var task *models.CreateTaskInput
	if err := ctx.ShouldBindBodyWithJSON(&task); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err := this.tasksService.CreateTask(task)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusCreated, gin.H{"data": task})
}

func (this *TasksHandler) putTaskHandler(ctx *gin.Context) {
	// Parse Id from request
	id, err := utils.GetIDFromParam(ctx)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// Parse task from request
	var task *models.UpdateTaskInput
	if err := ctx.ShouldBindBodyWithJSON(&task); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := this.tasksService.UpdateTask(id, task); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"data": task})
}

func (this *TasksHandler) deleteTaskHandler(ctx *gin.Context) {
	id, err := utils.GetIDFromParam(ctx)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := this.tasksService.DeleteTask(id); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.Status(http.StatusNoContent)
}

func NewTaskHandler(taskService *services.TasksService) *TasksHandler {
	return &TasksHandler{taskService}
}
