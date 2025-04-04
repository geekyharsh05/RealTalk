import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
import { ApiError } from "../utils/apiError.util";

config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImageToCloudinary = async (image: string): Promise<string> => {
  try {
    const uploadResult = await cloudinary.uploader.upload(image);

    return uploadResult.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new ApiError(500, 'Image upload failed');
  }
};


export const deleteImageFromCloudinary = async (imageUrl: string): Promise<void> => {
    try {
      const publicId = imageUrl.split('/').pop()?.split('.')[0];
      if (!publicId) {
        throw new ApiError(400, 'Invalid Cloudinary image URL');
      }
      
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      throw new ApiError(400, 'Image deletion failed');
    }
};
  
export default cloudinary;