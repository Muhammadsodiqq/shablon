import  Express  from "express";
import userController from "../controllers/userController.js"

const router = Express.Router();

router.post("/sign-up", userController.SignUp);
router.post("/login", userController.code_validation);


export default {
    path:"/users",
    router
}