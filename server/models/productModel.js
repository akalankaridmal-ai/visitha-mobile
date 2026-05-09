// server/models/productModel.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["New", "Used"], // Only allows these two values
    },
    brand: {
      type: String,
      required: [true, "Brand is required"], // e.g., Apple, Samsung
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
    },
    images: {
      type: [String], // Array of image URLs
    },
    shipping: {
      type: Boolean,
    },
    // Adding fields specific to used phones
    condition: {
      type: String, // e.g., 99% condition, Brand New
    },
    batteryHealth: {
      type: String, // Useful for used iPhones
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true } // Automatically creates 'createdAt' and 'updatedAt'
);

export default mongoose.model("Products", productSchema);