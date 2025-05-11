package services

import (
	"backend/models"
	"backend/repositories"
	"strings"
)

type TasksService struct {
	taskRepository *repositories.TasksRepository
}

func NewTasksService(taskRepository *repositories.TasksRepository) *TasksService {
	return &TasksService{taskRepository}
}

func (s *TasksService) CreateTask(task *models.CreateTaskInput) error {
	taskDto := &models.Task{
		Title:       task.Title,
		Description: task.Description,
	}
	if task.Completed != nil {
		task.Completed = task.Completed
	}
	return s.taskRepository.CreateTask(taskDto)
}

func (s *TasksService) GetTasks(filter models.GetTaskQuery) ([]models.Task, int64, error) {
	filters := make(map[string]repositories.FilterCondition)
	filterPairs := strings.Split(filter.Filters, ",")
	for _, pair := range filterPairs {
		keyValue := strings.Split(pair, ":")
		if len(keyValue) == 3 {
			filters[keyValue[0]] = repositories.FilterCondition{Operator: keyValue[1], Value: keyValue[2]}
		}
	}
	query := repositories.TaskQuery{
		SortBy:  filter.SortBy,
		Order:   filter.Order,
		Page:    filter.Page,
		Limit:   filter.Limit,
		Filters: filters,
	}
	return s.taskRepository.GetAllTasks(query)
}

func (s *TasksService) GetTaskByID(id uint) (*models.Task, error) {
	return s.taskRepository.GetTaskByID(id)
}

func (s *TasksService) UpdateTask(id uint, updated *models.UpdateTaskInput) error {
	task, err := s.taskRepository.GetTaskByID(id)
	if err != nil {
		return err
	}

	task.Title = updated.Title
	task.Description = updated.Description
	task.Status = *updated.Status

	return s.taskRepository.UpdateTask(task)
}

// Delete a task by ID
func (s *TasksService) DeleteTask(id uint) error {
	return s.taskRepository.DeleteTask(id)
}
