import express from "express";
const router = express.Router();
import productController from "../controlles/productController.js"



router.get("/:id", productController.getById);//checked
router.post("/",productController.post);//CHECKED
router.get("/", productController.getAll);//checked
router.delete("/:id", productController.Delete);//checked
router.put("/:id",productController.put);//checked



export default router;
