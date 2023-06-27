package userdto

type UserResponse struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Phone    string `json:"phone"`
	Address  string `json:"address"`
	Role     string `json:"role"`
	Image    string `json:"image"`
}

type UserResponseImage struct {
	ID    int    `json:"id"`
	Image string `json:"image"`
}

type UserResponseDelete struct {
	ID int `json:"id"`
}
