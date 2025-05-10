package utils

import (
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetIDFromParam(ctx *gin.Context) (uint, error) {
	idParam := ctx.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil || id <= 0 {
		return 0, err
	}
	return uint(id), nil
}
