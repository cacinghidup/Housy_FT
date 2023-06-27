package authdto

type LoginResponse struct {
	Email  string `gorm:"type: varchar(255)" json:"email"`
	Token  string `gorm:"type: varchar(255)" json:"token"`
	Role   string `json:"role" gorm:"type:varchar(50)"`
	UserID int    `json:"user_id"`
	Gender string `json:"gender"`
}

type AuthResponse struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Phone    string `json:"phone"`
	Address  string `json:"address"`
	Gender   string `json:"gender"`
}

type CheckAuthResponse struct {
	UserID int    `json:"user_id"`
	Role   string `json:"role"`
}
