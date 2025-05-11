package models

import (
	"time"

	"gorm.io/gorm"
)

type Task struct {
	gorm.Model
	Title        string    `gorm:"not null" json:"title"`
	Description  string    `json:"description"`
	Status       string    `gorm:"default:draft" json:"status"`
	AssignedUser uint      `json:"assigned_user"`
	CreatedAt    time.Time `gorm:"column:created_at" json:"created_at"`
	DueDate      time.Time `gorm:"column:due_date" json:"due_date"`
}

type TaskStatus struct {
	gorm.Model
	Title       string `gorm:"not null" json:"title"`
	Description string `json:"description"`
}

type Organization struct {
	gorm.Model
	Title string `gorm:"not null" json:"title"`
}

type User struct {
	gorm.Model
	Name     string `gorm:"not null" json:"name"`
	Email    string `gorm:"unique;not null" json:"email"`
	Password string `json:"-"` // Hashed, omit in JSON
}

type UserOrganization struct {
	gorm.Model
	UserID         uint      `json:"user_id"`
	OrganizationID uint      `json:"organization_id"`
	JoinedAt       time.Time `json:"joined_at"` // Optional metadata

	User         User         `gorm:"foreignKey:UserID"`
	Organization Organization `gorm:"foreignKey:OrganizationID"`
}
