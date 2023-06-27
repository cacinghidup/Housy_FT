package propertydto

type PropertyResponse struct {
	ID       int    `json:"id" form:"id"`
	Name     string `json:"name" form:"name"`
	Province string `json:"province" form:"province"`
	City     string `json:"city" form:"city"`
	Address  string `json:"address" form:"address"`
	Price    int64  `json:"price" form:"price"`
	// Amenities datatypes.JSON `json:"amenities" form:"amenities"`
	Furnished          string `json:"furnished" form:"furnished"`
	PetAllowed         string `json:"pet" form:"pet"`
	SharedAccomodation string `json:"shared_accomodation" form:"shared_accomodation"`
	Bedroom            int16  `json:"bedroom" form:"bedroom" `
	Bathroom           int16  `json:"bathroom" form:"bathroom" `
	Area               int32  `json:"area" form:"area" `
	Ready              bool   `json:"ready" form:"ready" `
	Description        string `json:"description" form:"description"`
	Image              string `json:"uploadImage" form:"uploadImage" `
}

type PropertyResponseDelete struct {
	ID int `json:"id"`
}
