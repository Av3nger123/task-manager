package models

type CreateTaskInput struct {
	Title       string `json:"title" binding:"required,min=3,max=100"`
	Description string `json:"description" binding:"omitempty,max=500"`
	Completed   *bool  `json:"completed"` // optional on create
}

type UpdateTaskInput struct {
	Title       string `json:"title" binding:"omitempty,min=3,max=100"`
	Description string `json:"description" binding:"omitempty,max=500"`
	Completed   *bool  `json:"completed"`
}

type GetTaskQuery struct {
	Filters string `form:"filters"` // This won't work for maps directly
	SortBy  string `form:"sortBy"`
	Order   string `form:"order"`
	Page    int    `form:"page"`
	Limit   int    `form:"limit"`
}
