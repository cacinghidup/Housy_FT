package repository

import (
	"housy-web/models"

	"gorm.io/gorm"
)

type PropertyRepository interface {
	FindProperty() ([]models.Property, error)
	GetProperty(ID int) (models.Property, error)
	CreateProperty(Property models.Property) (models.Property, error)
	UpdateProperty(Property models.Property) (models.Property, error)
	DeleteProperty(Property models.Property) (models.Property, error)
}

type repositoriesProperty struct {
	db *gorm.DB
}

func RepositoryProperty(db *gorm.DB) *repositoriesProperty {
	return &repositoriesProperty{db}
}

func (r *repositoriesProperty) FindProperty() ([]models.Property, error) {
	var Propertys []models.Property
	err := r.db.Find(&Propertys).Error

	return Propertys, err
}

func (r *repositoriesProperty) GetProperty(ID int) (models.Property, error) {
	var Property models.Property
	err := r.db.First(&Property, ID).Error

	return Property, err
}

func (r *repositoriesProperty) CreateProperty(Property models.Property) (models.Property, error) {
	err := r.db.Create(&Property).Error

	return Property, err
}

func (r *repositoriesProperty) UpdateProperty(Property models.Property) (models.Property, error) {
	err := r.db.Save(&Property).Error

	return Property, err
}

func (r *repositoriesProperty) DeleteProperty(Property models.Property) (models.Property, error) {
	err := r.db.Delete(&Property).Error

	return Property, err
}
