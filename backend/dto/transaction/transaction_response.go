package dtotransaction

import "housy-web/models"

type TransactionResponse struct {
	ID int64 `json:"id" form:"id"`
	// CounterQty int32  `json:"counter_qty" form:"counter_qty" `
	Total              int64  `json:"total" form:"total" `
	Status             string `json:"status" form:"status" `
	CheckIn            string `json:"check_in" form:"check_in" `
	CheckOut           string `json:"check_out" form:"check_out" `
	AddressTransaction string `json:"address_transaction" form:"address_transaction" `
	PropertyID         int    `json:"property_id" `
	Property           models.Property
	UserID             int `json:"user_id"`
	User               models.UserResponse
}
