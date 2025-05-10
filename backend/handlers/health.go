package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type HealthHandler struct {
}

func (this *HealthHandler) RegisterRoutes(router *gin.RouterGroup) {
	router.GET("", this.getHealth)
}

func (this *HealthHandler) getHealth(ctx *gin.Context) {
	ctx.String(http.StatusOK, "Status OK!")
}

func NewHealthHandler() *HealthHandler {
	return &HealthHandler{}
}
