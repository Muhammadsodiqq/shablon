import categoryRoute from "./categoryRoute.js";
import fileRoute from "./fileRoute.js";
import userRoute from "./userRoute.js"

export default (app) => {
    app.use(userRoute.path,userRoute.router);
    app.use(categoryRoute.path,categoryRoute.router);
    app.use(fileRoute.path,fileRoute.router);
}