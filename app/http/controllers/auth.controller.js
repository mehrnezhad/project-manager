class AuthController {

    register(req,res,next){

        res.send("register")
    }
}

export const authController = new AuthController()