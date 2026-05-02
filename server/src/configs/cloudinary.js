/** @format */

import { v2 as cloudinary } from 'cloudinary';

let isConfigured = false;

const connectCloudinary = async () => {
  if (isConfigured) return;

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
  });

  isConfigured = true;
  console.log('✅ Cloudinary configured');
};

export default connectCloudinary;
