import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {type: String, required: true},
    location:{type:String, required:true},
    rt_event:{type:Boolean, default:false}

}, {timestamp:true})

let Dataset = mongoose.models.event || mongoose.model('event', eventSchema)
export default Dataset;