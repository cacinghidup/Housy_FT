package handlers

import (
	"context"
	propertydto "housy-web/dto/property"
	dto "housy-web/dto/result"
	"housy-web/models"
	"housy-web/repository"
	"net/http"
	"os"
	"strconv"

	"github.com/cloudinary/cloudinary-go"
	"github.com/cloudinary/cloudinary-go/api/uploader"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type handlerProperty struct {
	PropertyRepository repository.PropertyRepository
}

func HandlerProperty(PropertyRepository repository.PropertyRepository) *handlerProperty {
	return &handlerProperty{PropertyRepository}
}

func (h *handlerProperty) FindProperty(c echo.Context) error {
	Propertys, err := h.PropertyRepository.FindProperty()

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: Propertys,
	})
}

func (h *handlerProperty) GetProperty(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	Property, err := h.PropertyRepository.GetProperty(id)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: convertResponsePropertys(Property)})
}

func (h *handlerProperty) CreateProperty(c echo.Context) error {

	Price, _ := strconv.Atoi(c.FormValue("price"))
	Bedroom, _ := strconv.Atoi(c.FormValue("bedroom"))
	Bathroom, _ := strconv.Atoi(c.FormValue("bathroom"))
	Area, _ := strconv.Atoi(c.FormValue("area"))

	UploadImage := c.Get("dataFile").(string)
	PublicID := c.Get("publicID").(string)

	request := propertydto.PropertyRequest{
		Name:     c.FormValue("name"),
		Province: c.FormValue("province"),
		City:     c.FormValue("city"),
		Address:  c.FormValue("address"),
		Price:    int64(Price),
		// Amenities: datatypes.JSON(c.FormValue("amenities")),
		Furnished:          c.FormValue("furnished"),
		PetAllowed:         c.FormValue("pet"),
		SharedAccomodation: c.FormValue("shared_accomodation"),
		Bedroom:            int16(Bedroom),
		Bathroom:           int16(Bathroom),
		Area:               int32(Area),
		Ready:              bool(true),
		Description:        c.FormValue("description"),
		Image:              UploadImage,
		PublicID:           PublicID,
	}

	validation := validator.New()
	err := validation.Struct(request)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error()})
	}

	property := models.Property{
		Name:     request.Name,
		Province: request.Province,
		City:     request.City,
		Address:  request.Address,
		Price:    request.Price,
		// Amenities: request.Amenities,
		Furnished:          request.Furnished,
		PetAllowed:         request.PetAllowed,
		SharedAccomodation: request.SharedAccomodation,
		Bedroom:            request.Bedroom,
		Bathroom:           request.Bathroom,
		Area:               request.Area,
		Ready:              request.Ready,
		Description:        request.Description,
		Image:              UploadImage,
		PublicID:           PublicID,
	}

	data, err := h.PropertyRepository.CreateProperty(property)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: convertResponsePropertys(data)})
}

func (h *handlerProperty) UpdateProperty(c echo.Context) error {
	request := new(propertydto.UpdateProperty)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error()})
	}

	id, _ := strconv.Atoi(c.Param("id"))
	property, err := h.PropertyRepository.GetProperty(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error()})
	}

	if request.Name != "" {
		property.Name = request.Name
	}
	if request.Province != "" {
		property.Province = request.Province
	}
	if request.City != "" {
		property.City = request.City
	}
	if request.Address != "" {
		property.Address = request.Address
	}
	if request.Price != 0 {
		property.Price = request.Price
	}
	// if request.Amenities != nil {
	// 	property.Amenities = request.Amenities
	// }
	if request.Furnished != "" {
		property.Furnished = request.Furnished
	}
	if request.PetAllowed != "" {
		property.PetAllowed = request.PetAllowed
	}
	if request.SharedAccomodation != "" {
		property.SharedAccomodation = request.SharedAccomodation
	}
	if request.Bedroom != 0 {
		property.Bedroom = request.Bedroom
	}
	if request.Bathroom != 0 {
		property.Bathroom = request.Bathroom
	}
	if request.Area != 0 {
		property.Area = request.Area
	}
	if request.Ready {
		property.Ready = request.Ready
	}
	if request.Description != "" {
		property.Description = request.Description
	}
	if request.Image != "" {
		property.Image = request.Image
	}

	data, err := h.PropertyRepository.UpdateProperty(property)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: convertResponsePropertys(data)})
}

func (h *handlerProperty) DeleteProperty(c echo.Context) error {
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	// Add your Cloudinary credentials ...
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	id, _ := strconv.Atoi(c.Param("id"))

	Property, err := h.PropertyRepository.GetProperty(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error()})
	}

	_, errCld := cld.Upload.Destroy(context.Background(), uploader.DestroyParams{PublicID: Property.PublicID})

	if errCld != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: err.Error()})
	}

	data, err := h.PropertyRepository.DeleteProperty(Property)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: convertResponseDeleteProperty(data)})
}

// convert response data
func convertResponsePropertys(Property models.Property) propertydto.PropertyResponse {
	return propertydto.PropertyResponse{
		ID:       Property.ID,
		Name:     Property.Name,
		Province: Property.Province,
		City:     Property.City,
		Address:  Property.Address,
		Price:    Property.Price,
		// Amenities: Property.Amenities,
		Furnished:          Property.Furnished,
		PetAllowed:         Property.PetAllowed,
		SharedAccomodation: Property.SharedAccomodation,
		Bedroom:            Property.Bedroom,
		Bathroom:           Property.Bathroom,
		Area:               Property.Area,
		Description:        Property.Description,
		Ready:              Property.Ready,
		Image:              Property.Image,
	}
}

func convertResponseDeleteProperty(Property models.Property) propertydto.PropertyResponseDelete {
	return propertydto.PropertyResponseDelete{
		ID: Property.ID,
	}
}
