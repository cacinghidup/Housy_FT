package models

import (
	"time"
)

type Transaction struct {
	ID int `json:"id" gnorm:"constraint:OnDelete:CASCADE,OnUpdate:CASCADE"`
	// CounterQty         int32        `json:"counter_qty" gnorm:"int(32)"`
	Total              int64        `json:"total" gnorm:"int(64)"`
	Status             string       `json:"status" gnorm:"varchar(100)"`
	CheckIn            string       `json:"check_in"`
	CheckOut           string       `json:"check_out"`
	AddressTransaction string       `json:"address_transaction"`
	CreatedAt          time.Time    `json:"created_at"`
	PropertyID         int          `json:"property_id"`
	Property           Property     `gnorm:"foreignKey:PropertyID"`
	UserID             int          `json:"user_id"`
	User               UserResponse `gnorm:"foreignKey:UserID"`
}

type Booking struct {
	ID int `json:"id" gnorm:"constraint:OnDelete:CASCADE,OnUpdate:CASCADE"`
	// CounterQty         int32        `json:"counter_qty" gnorm:"int(32)"`
	Total              int64        `json:"total" gnorm:"int(64)"`
	Status             string       `json:"status" gnorm:"varchar(100)"`
	CheckIn            string       `json:"check_in"`
	CheckOut           string       `json:"check_out"`
	AddressTransaction string       `json:"address_transaction"`
	CreatedAt          time.Time    `json:"created_at"`
	PropertyID         int          `json:"property_id"`
	Property           Property     `gnorm:"foreignKey:PropertyID"`
	UserID             int          `json:"user_id"`
	User               UserResponse `gnorm:"foreignKey:UserID"`
}
