import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: { type: String , required: true},
  description: { type: String },
  owner: { type: mongoose.Types.ObjectId, required :true },
  users: { type: [mongoose.Types.ObjectId] , default : []},

},{
   timeseries: true 
});

export const teamModel = mongoose.model("team",teamSchema)
