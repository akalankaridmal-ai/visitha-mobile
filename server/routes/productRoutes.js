// server/routes/productRoutes.js
import express from "express";
import { 
  createProductController, 
  getProductController, 
  productPhotoController 
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// routes
router.post("/create-product", createProductController);
router.get("/get-product", getProductController);
router.get("/product-photo/:pid", productPhotoController);
router.post("/create-product", formidable(), createProductController);

export default router;