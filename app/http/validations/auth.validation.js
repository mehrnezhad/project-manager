import { body } from "express-validator";
import { userModel } from "../../models/user.js";

export const authValidator = () => {
  return [
    body("username")
      .isLength({ min: 3 })
      .custom(async(value, ctx) => {
        if (!value) {
          throw "نام کاربری الزامی می باشد";
        }
        const user =await userModel.findOne({ username: value });
        if (user) {
          throw "نام کاربری وارد شده تکراری می باشد";
        }
        return true;
      }),
    body("email")
      .isEmail()
      .custom(async(email) => {
        if(!email){
           throw "وارد کردن ایمیل الزامی می باشد"
        }
        const user = await userModel.findOne({email});
        if (user) {
          throw "ایمیل وارد شده تکراری می باشد";
        }

        return true
      }),

    body("mobile")
      .isMobilePhone("fa-IR")
      .custom(async (mobile) => {
        const user =await userModel.findOne({ mobile });
        if (user) {
          throw "شماره موبایل وارد دشه تکراری می باشد";
        }
        return true;
      })
      .withMessage("فرمت شماره موبایل درست نمی باشد"),


    body("password")
      .isLength({ min: 6, max: 16 })
      .custom((value, ctx) => {
        if (!value) {
          throw "رمز عبور الزامی می باشد";
        }
        if (value !== ctx?.req?.body?.confirm_password) {
          throw "رمز عبور با تکرار رمز عبور یکسان نمی باشد";
        }
        return true;
      }),
  ];
};

export const loginValidator = ()=>{
    return [
        body('username').notEmpty().withMessage("نام کاربری الزامی می باشد"),
        body('password').notEmpty().isLength({min:6 , max:16}).withMessage("رمز عبور الزامی می باشد"),
    ]
}
