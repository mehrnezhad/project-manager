import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  user_name: { type: String , unique: true , required: true},
  password: { type: String , required: true},
  mobile: { type: String , unique: true , required: true},
  email: { type: String , unique: true , required: true },
  skills: { type: String, default:[] },
  teams: { type: String ,  default:[]},
  roles: { type: String  ,default:['USERS']},
},{
    timeseries:true
});

export const userModel = mongoose.model("user",userSchema)
