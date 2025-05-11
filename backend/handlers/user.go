package handlers

import (
	"backend/middleware"
	"backend/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	service *services.UserService
}

func NewUserHandler(service *services.UserService) *UserHandler {
	return &UserHandler{service}
}

func (h *UserHandler) RegisterRoutes(router *gin.RouterGroup) {
	router.Use(middleware.AuthMiddleware())
	router.GET("/me", h.Me)
}

func (h *UserHandler) Me(c *gin.Context) {
	userID := c.MustGet("user_id").(uint)
	user, err := h.service.GetUserByID(userID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}
	c.JSON(http.StatusOK, user)
}
