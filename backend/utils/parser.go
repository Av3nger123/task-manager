package utils

import (
	"errors"
	"fmt"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator"
)

func GetIDFromParam(ctx *gin.Context) (uint, error) {
	idParam := ctx.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil || id <= 0 {
		return 0, err
	}
	return uint(id), nil
}

func MapValidationErrors(err error) map[string]string {
	errorsMap := make(map[string]string)

	var ve validator.ValidationErrors
	if errors.As(err, &ve) {
		for _, fe := range ve {
			field := strings.ToLower(fe.Field())
			errorsMap[field] = validationMessage(fe)
		}
	} else {
		errorsMap["general"] = err.Error()
	}

	return errorsMap
}

func validationMessage(fe validator.FieldError) string {
	switch fe.Tag() {
	case "required":
		return fmt.Sprintf("%s is required", strings.ToLower(fe.Field()))
	case "email":
		return "Invalid email address"
	case "min":
		return fmt.Sprintf("%s must be at least %s characters", strings.ToLower(fe.Field()), fe.Param())
	default:
		return fmt.Sprintf("%s is not valid", strings.ToLower(fe.Field()))
	}
}
