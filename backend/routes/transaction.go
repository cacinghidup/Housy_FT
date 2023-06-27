package routes

import (
	"housy-web/handlers"
	"housy-web/pkg/middleware"
	"housy-web/pkg/mysql"
	"housy-web/repository"

	"github.com/labstack/echo/v4"
)

func TransactionRoutes(e *echo.Group) {
	transactionRepository := repository.RepositoryTransaction(mysql.DB)
	h := handlers.HandlerTransaction(transactionRepository)

	e.GET("/orders", h.FindTransaction)
	e.POST("/transaction", middleware.Auth(h.CreateTransaction))
	e.GET("/transaction/:id", middleware.Auth(h.GetTransaction))
	e.PATCH("/transaction/:id", middleware.Auth(h.UpdateTransaction))
	e.POST("/notification", h.Notification)

	// ------------------------------------------------- //
	e.POST("/booking", middleware.Auth(h.CreateBooking))
	e.DELETE("/booking/:id", middleware.Auth(h.DeleteBooking))
	e.GET("/booking", h.FindBooking)
	e.GET("/booking/:id", middleware.Auth(h.FindBooking))
}
