import express from "express";
import { 
  createProductController, 
  getProductController,
  searchProductController,
  productPhotoController,
  productFiltersController,
  relatedProductController 
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// routes
router.post("/create-product", formidable(), createProductController);
router.get("/get-product", getProductController);
router.get("/product-photo/:pid", productPhotoController);
router.get("/search/:keyword", searchProductController);
router.post("/product-filters", productFiltersController);
router.get("/related-product/:pid/:cid", relatedProductController);

export default router;
