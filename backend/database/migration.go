package database

import (
	"fmt"
	"housy-web/models"
	"housy-web/pkg/mysql"
)

// automatic migrate
func RunMigration() {
	err := mysql.DB.AutoMigrate(
		&models.User{},
		&models.Property{},
		&models.Transaction{},
		&models.Booking{},
	)

	if err != nil {
		panic("Migration Failed")
	}

	fmt.Println("Migration Success")
}
