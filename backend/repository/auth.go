package repository

import (
	"fmt"
	"housy-web/models"

	"gorm.io/gorm"
)

type AuthRepository interface {
	Register(user models.User, email string) (models.User, error)
	Login(email string) (models.User, error)
	CheckAuth(ID int) (models.User, error)
}

func RepositoryAuth(db *gorm.DB) *repositories {
	return &repositories{db}
}

func (r *repositories) Register(user models.User, email string) (models.User, error) {
	var emailExist models.User
	err := r.db.Where("email = ?", email).First(&emailExist).Error
	if err == nil {
		return models.User{}, fmt.Errorf("email %s is already in use", email)
	}

	err = r.db.Create(&user).Error

	return user, err
}

func (r *repositories) Login(email string) (models.User, error) {
	var user models.User
	err := r.db.First(&user, "email=?", email).Error

	return user, err
}

func (r *repositories) CheckAuth(ID int) (models.User, error) {
	var user models.User
	err := r.db.First(&user, ID).Error // add this code

	return user, err
}
