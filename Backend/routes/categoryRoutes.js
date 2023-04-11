import express from "express";
import Controller from "../controlles/categoryContoller.js";

const router = express.Router();

router.post("/", Controller.addCategory);
router.get("/", Controller.getCategory);
router.get("/:id", Controller.getCategoryById);
router.put("/:id", Controller.editCategory);
router.delete("/:id", Controller.deleteCategory);

export default router;