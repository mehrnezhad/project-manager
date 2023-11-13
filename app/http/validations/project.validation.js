import { body } from "express-validator"

export const projectValidator = ()=>{
   
    return [

      body('title').custom((value , {req})=>{
           if(!value) throw 'وارد کردن عنوان پروژه الزامی می باشد'
           return true
      }),

    //   body("image").custom((value, { req }) => {

    //     console.log(req)
    //     if (Object.keys(req.files).length == 0) {
    //         throw "فایل مورد نظر را ناتخاب کنید . "
    //     }
    //     const ext = path.extname(req.files.name)
    //     const extValid = [".jpg", ".png", ".webp", ".jpeg"]
    //     if (!extValid.includes(ext)) throw "پسوند تصویر اشتباه می باشد"
    //     const maxSize = 2 * 1024 * 1024;
    //     if (req.files.size > maxSize) throw "حجم فایل آپلود شده زیاد می باشد"

    //     return true
    // }),
      body('text').notEmpty().isLength({min: 10}).withMessage('حداقل توضیحات باید 10 کاراکتر باشد')
   ]
}