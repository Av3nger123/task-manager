package repositories

import (
	"backend/models"
	"fmt"
	"strings"

	"gorm.io/gorm"
)

type TasksRepository struct {
	db *gorm.DB
}

type TaskQuery struct {
	Filters map[string]FilterCondition
	SortBy  string
	Order   string
	Page    int
	Limit   int
}

type FilterCondition struct {
	Operator string
	Value    string
}

func NewTasksRepository(db *gorm.DB) *TasksRepository {
	return &TasksRepository{db}
}

func (r *TasksRepository) CreateTask(task *models.Task) error {
	return r.db.Create(task).Error
}

func (r *TasksRepository) GetAllTasks(filter TaskQuery) ([]models.Task, int64, error) {
	var tasks []models.Task
	query := r.db.Model(&tasks)

	var total int64
	for field, cond := range filter.Filters {
		switch cond.Operator {
		case "like":
			pattern := fmt.Sprintf("%%%s%%", strings.ToLower(cond.Value))
			query = query.Where(fmt.Sprintf("%s LIKE ?", field), pattern)
		case "eq":
			query = query.Where(fmt.Sprintf("%s = ?", field), cond.Value)
		case "ne":
			query = query.Where(fmt.Sprintf("%s <> ?", field), cond.Value)
		case "gt":
			query = query.Where(fmt.Sprintf("%s > ?", field), cond.Value)
		case "gte":
			query = query.Where(fmt.Sprintf("%s >= ?", field), cond.Value)
		case "lt":
			query = query.Where(fmt.Sprintf("%s < ?", field), cond.Value)
		case "lte":
			query = query.Where(fmt.Sprintf("%s <= ?", field), cond.Value)
		}
	}

	fmt.Println(filter)

	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	if filter.SortBy != "" {
		order := "asc"
		if filter.Order == "desc" {
			order = "desc"
		}
		query = query.Order(filter.SortBy + " " + order)
	}

	limit := filter.Limit
	if limit <= 0 {
		limit = 10
	}
	page := filter.Page
	if page <= 0 {
		page = 1
	}
	offset := (page - 1) * limit

	err := query.Limit(limit).Offset(offset).Find(&tasks).Error
	return tasks, total, err
}

func (r *TasksRepository) GetTaskByID(id uint) (*models.Task, error) {
	var task models.Task
	err := r.db.First(&task, id).Error
	return &task, err
}

// UpdateTask updates an existing task in the database
func (r *TasksRepository) UpdateTask(task *models.Task) error {
	return r.db.Save(task).Error
}

// DeleteTask removes a task from the database by ID
func (r *TasksRepository) DeleteTask(id uint) error {
	return r.db.Delete(&models.Task{}, id).Error
}
