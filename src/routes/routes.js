import userRoute from "./userRoute.js"

export default (app) => {
    app.use(userRoute.path,userRoute.router);
}