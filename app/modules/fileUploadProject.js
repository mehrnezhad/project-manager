import path from "path"
import {pathUploadFile} from './functions.js'
export const fileUploadProject = (req, res, next) => {

    if (!req.files || Object.keys(req.files).length == 0) {
        throw { status: 400, message: "file not found" };
      }
      const validExt = ['.jpg' , '.png' , '.jpeg' , '.webp']

    try {
        for (const key in req.files) {

            const file = req.files[key];

            const ext = path.extname(file.name)
            if(!validExt.includes(ext)){
                throw { status: 400, message: "پسوند فایل قابل قبول نیست" };
            }
            if(file.size > 1024){
                throw { status: 400, message: "سایز تصویر بزرگ می باشد" };
            }
            const destination = pathUploadFile()+ '/' + (Date.now() + ext)
            req.body.image = destination
            file.mv(destination, (err) => {
                if (err) throw { status: 400, message: 'بارگزاری انجام شد' }
             
                return next()
            })
        }
    } catch (error) {
        return next(error)
    }

} 