package models

type CreateTaskInput struct {
	Title       string `json:"title" binding:"required,min=3,max=100"`
	Description string `json:"description" binding:"omitempty,max=500"`
	Completed   *bool  `json:"completed"` // optional on create
}

type UpdateTaskInput struct {
	Title       string  `json:"title" binding:"omitempty,min=3,max=100"`
	Description string  `json:"description" binding:"omitempty,max=500"`
	Status      *string `json:"status"`
}

type GetTaskQuery struct {
	Filters string `form:"filters"` // This won't work for maps directly
	SortBy  string `form:"sortBy"`
	Order   string `form:"order"`
	Page    int    `form:"page"`
	Limit   int    `form:"limit"`
}

type RegisterInput struct {
	Name     string `json:"name" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=8"`
}

type LoginInput struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}
