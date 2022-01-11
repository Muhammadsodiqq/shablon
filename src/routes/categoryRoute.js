import  Express  from "express";
import categoryController from "../controllers/categoryController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import fileUpload from "express-fileupload";
import authMiddlseware from "../middlewares/authMiddlseware.js";
const router = Express.Router();

const options = {
    safeFileNames: true
}

router.post("/add-category", authMiddleware, categoryController.addCategory);
router.get("/get-category", authMiddleware, categoryController.getCategory);
router.get("/get-categories", authMiddleware, categoryController.getCategories);
router.post("/edit-category", authMiddleware, categoryController.updateCategory);
router.post("/delete-category", authMiddleware, categoryController.deleteCategory);
router.post("/add-type", authMiddleware, categoryController.addType);
router.post("/get-type_by_category", authMiddleware, categoryController.getTypesByCategory);
router.post("/add-photo", [authMiddlseware,fileUpload("file",options)], categoryController.add_photo);
router.get("/get-photo_by_type", authMiddleware, categoryController.getPhotosByType);


export default {
    path:"/category",
    router
}