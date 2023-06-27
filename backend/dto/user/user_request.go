package userdto

type CreateUser struct {
	Name     string `json:"name" form:"name" validate:"required"`
	Email    string `json:"email" form:"email" validate:"required"`
	Password string `json:"password" form:"password" validate:"required"`
	Phone    string `json:"phone" form:"phone" validate:"required"`
	Address  string `json:"address" form:"address" validate:"required"`
	Role     string `json:"role"`
	Gender   string `json:"gender" form:"gender"`
	Image    string `json:"image"`
}

type UpdateUser struct {
	Name        string `json:"name" form:"name"`
	Email       string `json:"email" form:"email"`
	Password    string `json:"password" form:"password"`
	NewPassword string `json:"newPassword" form:"newPassword"`
	Phone       string `json:"phone" form:"phone"`
	Address     string `json:"address" form:"address"`
	Gender      string `json:"gender" form:"gender"`
	Image       string `json:"image"`
}
