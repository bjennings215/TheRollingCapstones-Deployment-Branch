import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    account_id: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    completed_modules: {
        module_id:{
            type: String,
            required: true
        },
        token: {
            type: Number,
            required: true
        },
    },
    liked_modules: {
        module_id:{
            type: String,
            required: true
        },
        module_name:{
            type: String,
            required: true
        },
        module_language: {
            type: String,
            required: true
        },
        module_description: {
            type:String,
            required: true
        },
    },
    recommended_modules: {
        module_id:{
            type: String,
            required: true
        },
        module_name:{
            type: String,
            required: true
        },
        module_language: {
            type: String,
            required: true
        },
    },
    Bookmarked_modules: {
        module_id:{
            type: String,
            required: true
        },
        module_name:{
            type: String,
            required: true
        },
        module_language: {
            type: String,
            required: true
        },
        submitGET_token: {
            type: String,
            required: true
        },
    },
    Rewards: {
        type: String,
        required: true
    },
    Rewards_received: {
        type: Number,
        required: true
    },
    Level: {
        type: Number,
        required: true
    },
    Likes: {
        type: Number,
        required: true
    },
})

const moduleData = mongoose.model('Account', accountSchema)

export default accountData
