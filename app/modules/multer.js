import multer from "multer"
import path from "path"
import {pathUploadFile} from "./functions.js"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null, pathUploadFile())

    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const filename = Date.now() + ext
        cb(null, filename)

    }

})

export const uploadMulter = multer({
    storage
})
