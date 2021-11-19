import  Express  from "express";
import userController from "../controllers/userController.js"

const router = Express.Router();

router.get("/", userController.getExample);


export default {
    path:"/users",
    router
}