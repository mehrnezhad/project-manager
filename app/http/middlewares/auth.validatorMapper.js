import { validationResult } from "express-validator";
export const authValidatorMapper=(req , res , next)=>{
    const result = validationResult(req)
    let err = {}
    result?.errors?.forEach(error => {

        err[error.path]=error.msg
        
    });
    if(Object.keys(err).length>0){
        res.json({
            statusCode: 400,
            error : err
        })
    }

    return next()
}      