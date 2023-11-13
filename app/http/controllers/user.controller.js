import { userModel } from "../../models/user.js"

class UserController {

    getProfile(req, res, next) {

        try {

            const user = req.user
            user.image_profile= req.protocol + "://" + req.get("host")+ "/" + user.image_profile
           
            res.json({
                status : 200,
                message : 'success',
                user: req.user
            })

        } catch (error) {
            next(error)
        }

    }

    async updateProfile(req, res, next) {

        try {
            let data = req.body
            const userId = req.user._id
            let fieldName = ["first_name", "last_name", "skills"]
            let badValue = ["", " ", null, undefined, NaN]
            Object.entries(data).forEach(([key, value]) => {
                if (!fieldName.includes(key)) delete data[key]
                if (badValue.includes(value)) delete data[key]
            })

            const result = await userModel.updateOne({ _id: userId }, { $set: data })
            if (result.modifiedCount > 0) {
                return res.json({
                    status: 200,
                    message: 'به روز رسانی با موفقیت انجام شد',
                    success: true
                })
            }
            throw { status: 400, message: 'به روز رسانی انجام نشد' }

        } catch (error) {
            next(error)
        }

    }

    async uploadImageProfile(req, res, next) {

        try {
            const path = req.file?.path.replace(/\\/g, '/').substring(7)
            const userID = req.user._id
            const result = await userModel.updateOne({ _id: userID }, { $set: { image_profile: path } })
            if (result.modifiedCount == 0) { throw { status: 400, message: "بارگزاری فایل انجام نشد" } }
            res.json({
                status: 200,
                message: 'آپلود با موفقیت انجام شد'
            })
        } catch (error) {
            next(error)
        }

    }
}

export const userController = new UserController()