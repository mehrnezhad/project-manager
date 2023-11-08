import { compareSync, genSaltSync, hashSync } from "bcrypt"
import jwt from "jsonwebtoken"

export const hashPassword=(pass)=>{
    const salt = genSaltSync(10)
    return hashSync(pass,salt)
}

export const comparePassword = (pass,hash)=>{
      return compareSync(pass, hash)
}

export const generateToken = (payload)=>{
    return jwt.sign(payload,process.env.SECRET_KEY,{expiresIn: 1 * 1000 * 60 * 60 * 24 })
}
