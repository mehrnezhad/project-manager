import { userModel } from "../../models/user.js";
import { hashPassword, comparePassword , generateToken } from "../../modules/functions.js";
class AuthController {
  async register(req, res, next) {
    try {
      const { username, password, mobile, email } = req.body;
      const hash_pass = hashPassword(password);

      const user = await userModel.create({
        username,
        mobile,
        email,
        password: hash_pass,
      });

      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async login(req,res,next){
    try {
      const {username , password} = req.body
      console.log(req.headers)
      const user = await userModel.findOne({ username })
      if(!user){ throw { status: 401 , message : "نام کاربری و یا رمز عبور اشتباه می باشد"}}
      if(!comparePassword(password,user.password)){ throw { status: 401 , message : "نام کاربری و یا رمز عبور اشتباه می باشد"}}
      const token =generateToken({username})
      user.token = token
      await user.save()
      return res.json(
        {
          status : 200,
          message : 'شما با موفقیت وارد سایت شدید ',
          success : 'true',
          token
        }
      )

    } catch (error) {
      next(error)
    }
  }
}

export const authController = new AuthController();
