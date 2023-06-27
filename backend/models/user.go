package models

import (
	"time"
)

type User struct {
	ID          int    `json:"id" gorm:"primary_key" gnorm:"constraint:OnDelete:CASCADE,OnUpdate:CASCADE"`
	Name        string `json:"name" gorm:"varchar(255)"`
	Email       string `json:"email" gorm:"varchar(255)"`
	Password    string `json:"password" gorm:"varchar(255)"`
	Phone       string `json:"phone" gorm:"varchar(255)"`
	Address     string `json:"address" gorm:"varchar(255)"`
	Role        string `json:"role" gorm:"varchar(50)"`
	Gender      string `json:"gender" gorm:"varchar(50)"`
	Image       string `json:"image" gorm:"varchar(100)"`
	Transaction []Transaction
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	Booking     []Booking
}

type UserResponse struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email" `
	Password string `json:"password" `
	Phone    string `json:"phone" `
	Address  string `json:"address" `
	Role     string `json:"role" `
	Gender   string `json:"gender" `
}

func (UserResponse) TableName() string {
	return "users"
}
