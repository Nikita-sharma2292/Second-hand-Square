const {v2} = require("cloudinary");
const APIError = require("./APIerrorHandler");


v2.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (images) => {
    const urls= [];
    try {
        for (const image in images){
            const result = await v2.uploader.upload(images[image]);
            urls.push(result.url);
        }

    } catch (err) {
        throw new APIError(500, "Something went wrong while uploading images on server.");
    }

    return urls;
}

module.exports = uploadOnCloudinary;