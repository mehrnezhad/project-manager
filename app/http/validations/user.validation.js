import { body } from "express-validator"
import path from "path"
export const uploadImageValidation = () => {

    return [

        body("image").custom((value, { req }) => {
            if (Object.keys(req.file).length == 0) {
                throw "فایل مورد نظر را ناتخاب کنید . "
            }
            const ext = path.extname(req.file.originalname)
            const extValid = [".jpg", ".png", ".webp", ".jpeg"]
            if (!extValid.includes(ext)) throw "پسوند تصویر اشتباه می باشد"
            const maxSize = 2 * 1024 * 1024;
            if (req.file.size > maxSize) throw "حجم فایل آپلود شده زیاد می باشد"

            return true
        })

    ]
}

