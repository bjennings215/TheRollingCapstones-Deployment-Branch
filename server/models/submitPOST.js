import mongoose from "mongoose"
import Inc from 'mongoose-sequence'

const AutoIncrement = Inc(mongoose)
const submit_POSTSchema = new mongoose.Schema({
        userID:{
            type: String,
            required:true,
            ref:'User'
        },
        source_code: {
            type: String,
            required:true
        },
        language_id: {
            type: Number,
            required:true
        },
        stdin: {
            type: String,
            default: 'test'
        },
        expected_output: {
            type: String,
            default: 'No output'
        },
        sent_to_API: {
            type:Boolean,
            default:false
        }
    },
    {
        timestamps:true
    }
)

submit_POSTSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id:'ticketNums',
    start_sq:100
})

const submit_POSTData = mongoose.model('Submit_POST', submit_POSTSchema )

export default submit_POSTData

