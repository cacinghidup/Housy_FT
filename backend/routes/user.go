package routes

import (
	"housy-web/handlers"
	"housy-web/pkg/middleware"
	"housy-web/pkg/mysql"
	"housy-web/repository"

	"github.com/labstack/echo/v4"
)

func UserRoutes(e *echo.Group) {
	userRepository := repository.RepositoryUser(mysql.DB)
	h := handlers.HandlerUser(userRepository)

	e.GET("/users", h.FindUsers)
	e.GET("/user/:id", h.GetUser)
	// e.POST("/user", h.CreateUser)
	e.PATCH("/user/:id", middleware.Auth(h.UpdateUser))
	e.PATCH("/userProfile/:id", middleware.Auth(middleware.UploadFile(h.UpdateProfileUser)))
	e.DELETE("/user/:id", middleware.Auth(h.DeleteUser))
}
