package services

import (
	"backend/models"
	"backend/repositories"
	"backend/utils"
)

type UserService struct {
	repo *repositories.UserRepository
}

func NewUserService(repo *repositories.UserRepository) *UserService {
	return &UserService{repo}
}

func (s *UserService) Register(user *models.User) error {
	hashed, _ := utils.HashPassword(user.Password)
	user.Password = hashed
	return s.repo.Create(user)
}

func (s *UserService) Login(email, password string) (string, error) {
	user, err := s.repo.FindByEmail(email)
	if err != nil || !utils.CheckPasswordHash(password, user.Password) {
		return "", err
	}
	return utils.GenerateJWT(user.ID)
}

func (s *UserService) GetUserByID(id uint) (*models.User, error) {
	return s.repo.FindByID(id)
}
