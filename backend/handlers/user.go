package handlers

import (
	dto "housy-web/dto/result"
	userdto "housy-web/dto/user"
	"housy-web/models"
	"housy-web/pkg/bcrypt"
	"housy-web/repository"
	"net/http"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
)

// struct save connetion
type handler struct {
	UserRepository repository.UserRepository
}

// function connection
func HandlerUser(UserRepository repository.UserRepository) *handler {
	return &handler{UserRepository}
}

// find all users
func (h *handler) FindUsers(c echo.Context) error {
	users, err := h.UserRepository.FindUsers()

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: users})
}

func (h *handler) GetUser(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	user, err := h.UserRepository.GetUser(id)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: user})
}

// update user
func (h *handler) UpdateUser(c echo.Context) error {

	request := userdto.UpdateUser{
		Password:    c.FormValue("password"),
		NewPassword: c.FormValue("new_password"),
	}

	// if err := c.Bind(request); err != nil {
	// 	return c.JSON(http.StatusBadRequest, dto.ErrorResult{
	// 		Code:    http.StatusBadRequest,
	// 		Message: err.Error()})
	// }

	// fmt.Println(request.Password, request.NewPassword)

	id, _ := strconv.Atoi(c.Param("id"))
	user, err := h.UserRepository.GetUser(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error()})
	}

	isValid := bcrypt.CheckPasswordHash(request.Password, user.Password)

	if !isValid {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: "Wrong Old Password"})
	} else if isValid && request.NewPassword != "" {
		password, _ := bcrypt.HashingPassword(request.NewPassword)
		user.Password = password
	} else if isValid && request.NewPassword == "" {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: "New Password is Required"})
	}

	// if request.Image != "" {
	// 	user.Image = request.Image
	// }

	user.UpdatedAt = time.Now()

	data, err := h.UserRepository.UpdateUser(user)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponse(data)})
}

func (h *handler) UpdateProfileUser(c echo.Context) error {
	UploadImage := c.Get("dataFile").(string)

	request := userdto.UpdateUser{
		Image: UploadImage,
	}

	id, _ := strconv.Atoi(c.Param("id"))
	user, err := h.UserRepository.GetUser(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error()})
	}

	if request.Image != "" {
		user.Image = request.Image
	} else if request.Image == "" {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: "Image is Required"})
	}

	user.UpdatedAt = time.Now()

	data, err := h.UserRepository.UpdateUser(user)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponseImage(data)})
}

// DELETE USER
func (h *handler) DeleteUser(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	user, err := h.UserRepository.GetUser(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error()})
	}

	data, err := h.UserRepository.DeleteUser(user)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponseDelete(data)})
}

// convert response data
func convertResponse(user models.User) userdto.UserResponse {
	return userdto.UserResponse{
		ID:       user.ID,
		Name:     user.Name,
		Email:    user.Email,
		Password: user.Password,
		Phone:    user.Phone,
		Address:  user.Address,
		Role:     user.Role,
		Image:    user.Image,
	}
}

func convertResponseDelete(user models.User) userdto.UserResponseDelete {
	return userdto.UserResponseDelete{
		ID: user.ID,
	}
}

func convertResponseImage(user models.User) userdto.UserResponseImage {
	return userdto.UserResponseImage{
		ID:    user.ID,
		Image: user.Image,
	}
}

// ------------------------------------------------------------------------------
