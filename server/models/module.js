import mongoose from "mongoose"


const moduleSchema = new mongoose.Schema({
    module_id: {
        type: String,
        required: true
    },
    module_name:{
        type: String,
        required: true
    },
    language_id:{
        type: Number,
        required: true
    },
    language:{
        type: String,
        required: true
    },
    Blob_Desc:{
        type:String,
        required: true
    },
    Full_Desc: {
        type: String,
        required: true
    },
    Example:{
        type: String,
        required: true
    },
    testcases: [{
        type: String,
        required:true,
    }],
    boilercode: {
        type: String,
        default: 'enter code here'
    },
    Reward:{
        type: String,
        default: 'none'
    },
    output: [{
        type: String
    }]
})

const moduleData = mongoose.model('Module', moduleSchema)

export default moduleData