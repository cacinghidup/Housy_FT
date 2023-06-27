package middleware

import (
	"context"
	"fmt"
	"net/http"
	"os"

	"github.com/cloudinary/cloudinary-go"
	"github.com/cloudinary/cloudinary-go/api/uploader"
	"github.com/labstack/echo/v4"
)

func UploadFile(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		var ctx = context.Background()

		// profile, _ := c.FormFile("profile")

		file, err := c.FormFile("uploadImage")

		if err != nil {
			return c.JSON(http.StatusBadRequest, err)
		}

		// srcProfile, _ := profile.Open()
		src, err := file.Open()

		if err != nil {
			return c.JSON(http.StatusBadRequest, err)
		}

		defer src.Close()
		// defer srcProfile.Close()

		// tempFile, err := os.CreateTemp("./upload", "image-*.png") // upload/image-3e10e160.png
		// if err != nil {
		// 	return c.JSON(http.StatusInternalServerError, err)
		// }

		// defer tempFile.Close()

		// if _, err = io.Copy(tempFile, src); err != nil {
		// 	return c.JSON(http.StatusInternalServerError, err)
		// }

		var CLOUD_NAME = os.Getenv("CLOUD_NAME")
		var API_KEY = os.Getenv("API_KEY")
		var API_SECRET = os.Getenv("API_SECRET")

		// Add your Cloudinary credentials ...
		cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

		// Upload file to Cloudinary ...
		resp, err := cld.Upload.Upload(ctx, src, uploader.UploadParams{Folder: "dewe-tour"})
		// respProfile, _ := cld.Upload.Upload(ctx, srcProfile, uploader.UploadParams{Folder: "profile"})
		if err != nil {
			fmt.Println(err.Error())
		}

		// fmt.Println("ini upload file", resp.SecureURL)
		// ctx := tempFile.Name() // upload/image-3e10e160.png

		c.Set("dataFile", resp.SecureURL)
		c.Set("publicID", resp.PublicID)
		// c.Set("dataFileProfile", respProfile.SecureURL)

		return next(c)
	}
}
