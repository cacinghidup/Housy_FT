package models

type Property struct {
	ID       int    `json:"id" gorm:"primary_key" gnorm:"constraint:OnDelete:CASCADE,OnUpdate:CASCADE"`
	Name     string `json:"name" gorm:"varchar(100)"`
	Province string `json:"province" gorm:"varchar(100)"`
	City     string `json:"city" gorm:"varchar(100)"`
	Address  string `json:"address" gorm:"varchar(100)"`
	Price    int64  `json:"price" gorm:"int(64)"`
	// Amenities datatypes.JSON `json:"amenities"`
	Furnished          string `json:"furnished"`
	PetAllowed         string `json:"pet"`
	SharedAccomodation string `json:"shared_accomodation"`
	Bedroom            int16  `json:"bedroom" gorm:"int(32)"`
	Bathroom           int16  `json:"bathroom" gorm:"varchar(100)"`
	Area               int32  `json:"area" gorm:"int(32)"`
	Ready              bool   `json:"ready"`
	Description        string `json:"description"`
	Image              string `json:"uploadImage" gorm:"varchar(100)"`
	PublicID           string `json:"public_id"`
}

// func (Amenities) TableName() string {
// 	return "amenities"
// }
