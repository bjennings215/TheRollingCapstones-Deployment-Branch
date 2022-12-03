import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    Age:{
        type:Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Streak:{
        type: Number,
        default: 0,
    },
    roles: [{
        type: String,
        default: 'User',
    }],
    active: {
        type:Boolean,
        default:true
    }
})

const userData = mongoose.model('User', userSchema)

export default userData