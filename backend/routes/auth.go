package routes

import (
	"housy-web/handlers"
	"housy-web/pkg/middleware"
	"housy-web/pkg/mysql"
	"housy-web/repository"

	"github.com/labstack/echo/v4"
)

func AuthRoutes(e *echo.Group) {
	authRepository := repository.RepositoryAuth(mysql.DB)
	h := handlers.HandlerAuth(authRepository)

	e.POST("/register", h.Register)
	e.POST("/login", h.Login)                          // add this code
	e.GET("/check-auth", middleware.Auth(h.CheckAuth)) // add this code
}
