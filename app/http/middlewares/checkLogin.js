import { jwtVerifyToken } from "../../modules/functions.js"
import { userModel } from "../../models/user.js"
export const checkLogin = async (req, res, next) => {
    try {
        const authorization = req?.headers?.authorization
        if (!authorization) throw { status: 401, message: 'لطفا وارد حساب کاربری خود شوید' }
        const token = authorization.split(" ")?.[1]
        if (!token) throw { status: 401, message: 'لطفا وارد حساب کاربری خود شوید ' }
        const username = jwtVerifyToken(token).username
        const user = await userModel.findOne({ username }, { password: 0  , roles : 0 , teams: 0})
        if (!user) throw { status: 401, message: 'لطفا وارد حساب کاربری خود شوید' }
        req.user = user
        return next()
    } catch (error) {
        next(error)
    }
}