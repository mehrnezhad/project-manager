import { compareSync, genSaltSync, hashSync } from "bcrypt"
import jwt from "jsonwebtoken"
import path from "path"
import fs from "fs"
import { dirname } from 'path';
import { fileURLToPath } from 'url';

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

export const jwtVerifyToken = (token)=>{
   const result = jwt.verify(token,process.env.SECRET_KEY)
   if(!result?.username) throw { status : 401 , message : 'لطفا وارد حساب کاربری خود شوید'}
   return result
}

export const pathUploadFile= ()=>{
    const __dirname = dirname(fileURLToPath(import.meta.url))
 
    let d = new Date()
    const year = d.getFullYear()+""
    const month = d.getMonth()+""
    const day = d.getDate()+""
    const fullPath = path.join(__dirname,"..","..","public","upload",year,month,day)

    fs.mkdirSync(fullPath, {recursive : true})
    return path.join("public","upload",year,month,day)

}