import express from "express";
import Controller from "../controlles/categoryContoller.js";

const router = express.Router();

router.post("/", Controller.createCategory);
router.get("/", Controller.getAllCategory);
router.get("/:id", Controller.getCategoryById);
router.put("/:id", Controller.updateCategory);
router.delete("/:id", Controller.deleteCategory);

export default router;