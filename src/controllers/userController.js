export default class userController {
    static async getExample(request,response) {
        try {
            return response.status(400).json({
                ok:true,
                message:"salom dunyo"
            })
        } catch (error) {
            return response.status(400).json({
                ok:false,
                message:error + ""
            })
        }
    }
}