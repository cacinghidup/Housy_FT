package dtotransaction

type TransactionRequest struct {
	ID int `json:"id" form:"id"`
	// CounterQty         int32  `json:"counter_qty" form:"counter_qty" validate:"required"`
	Total              int64  `json:"total" form:"total" validate:"required"`
	Status             string `json:"status" form:"status" validate:"required"`
	CheckIn            string `json:"check_in" form:"check_in" validate:"required"`
	CheckOut           string `json:"check_out" form:"check_out" validate:"required"`
	AddressTransaction string `json:"address_transaction" form:"address_transaction" validate:"required"`
	PropertyID         int    `json:"property_id" form:"property_id" `
	UserID             int    `json:"user_id" form:"user_id"`
}

type UpdateTransaction struct {
	ID     int    `json:"id" form:"id"`
	Status string `json:"status" form:"status"`
}
