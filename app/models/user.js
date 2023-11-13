import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  username: { type: String , unique: true, required: true },
  password: { type: String , required: true},
  image_profile: { type: String , required: false},
  mobile: { type: String  , unique: true,required: true},
  email:   {type: String,unique: true ,required: true},
  skills: { type: [String], default:[] },
  teams: { type: [mongoose.Types.ObjectId] ,  default:[]},
  roles: { type: [String]  ,default:['USERS']},
  token: { type: String},
},{
    timestamps:true
});



export const userModel = mongoose.model("user",userSchema)
