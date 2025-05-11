package main

import (
	"backend/config"
	"backend/middleware"
	"backend/routes"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "hello world")
}

func main() {
	db := config.InitDB()
	rootRouter := gin.Default()

	rootRouter.Use(middleware.CorsMiddleware())

	// Register Health Route handler
	routes.RegisterHealthRoutes(rootRouter)
	routes.RegisterTasksRoutes(rootRouter, db)
	routes.RegisterAuthRoutes(rootRouter, db)
	routes.RegisterUserRoutes(rootRouter, db)

	rootRouter.Run(":8080")
}
