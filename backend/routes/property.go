package routes

import (
	"housy-web/handlers"
	"housy-web/pkg/middleware"
	"housy-web/pkg/mysql"
	"housy-web/repository"

	"github.com/labstack/echo/v4"
)

func PropertyRoutes(e *echo.Group) {
	propertyRepository := repository.RepositoryProperty(mysql.DB)
	h := handlers.HandlerProperty(propertyRepository)

	e.GET("/propertys", h.FindProperty)
	e.GET("/property/:id", h.GetProperty)
	e.POST("/propertys", middleware.Auth(middleware.UploadFile(h.CreateProperty)))
	e.PATCH("/property/:id", middleware.Auth(h.UpdateProperty))
	e.DELETE("/property/:id", middleware.Auth(h.DeleteProperty))
}
