import  Express  from "express";
import path from 'path'
let __dirname = path.resolve(path.dirname(''));
const router = Express.Router();
// router.use(authMiddleware)

router.use('/', Express.static(path.join(__dirname, "src", "public", "files")))

export default {
    path: "/files",
    router: router
}