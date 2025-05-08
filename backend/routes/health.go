package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func RegisterHealthRoutes(root_router *gin.Engine) {
	root_router.GET("/health", healthHandler)
}

func healthHandler(ctx *gin.Context) {
	ctx.String(http.StatusOK, "Status OK!")
}
