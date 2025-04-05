import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { ApiError } from "../utils/apiError.util";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImageToCloudinary = async (
  image: string,
): Promise<string> => {
  try {
    const isBase64Image = /^data:image\/[a-z]+;base64,/.test(image);
    const imageToUpload = isBase64Image
      ? image
      : `data:image/jpeg;base64,${image}`;

    const uploadResult = await cloudinary.uploader.upload(imageToUpload, {
      folder: "realtalk",
    });

    return uploadResult.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new ApiError(500, "Image upload failed");
  }
};

export const deleteImageFromCloudinary = async (
  imageUrl: string,
): Promise<void> => {
  try {
    const matches = imageUrl.match(/upload\/(?:v\d+\/)?(.+)\.\w+$/);
    if (!matches || !matches[1]) {
      throw new ApiError(400, "Invalid Cloudinary image URL");
    }

    const publicId = matches[1];

    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary deletion error:", error);
    throw new ApiError(400, "Image deletion failed");
  }
};

export default cloudinary;
