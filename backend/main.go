package main

import (
	"backend/routes"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "hello world")
}

func main() {

	root_router := gin.Default()

	routes.RegisterHealthRoutes(root_router)
	routes.RegisterTaskRoutes(root_router)

	root_router.Run(":8080")
}
