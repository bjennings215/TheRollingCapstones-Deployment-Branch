import mongoose from "mongoose"
import Inc from 'mongoose-sequence'

const AutoIncrement = Inc(mongoose)
const submit_GETSchema = new mongoose.Schema({
        module_name:{
            type: Number,
            required: true
         },
        userID:{
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User'
        },
        source_code: {
            type: String,
            required: true
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
        stdout: {
            type: String,
            default: 'complete'
        },
        status_id: {
            type: Number,
            required: true
        },
        created_at: {
            type: Date,
            default: Date.now
        },
        updated_at: {
            type: Date,
            default: Date.now
        },
        time: {
            type: Float,
            required: true
        },
        memory: {
            type: Number,
            required: true
        },
        stderr: {
            type: String,
            default: ' '
        },
        token: {
            type: String,
            required: true
        },
        message: {
            type: String,
            default: ''
        },
        redirect_stderr_to_stdout: {
            type: String,
            required: true
        },
        status: {
            id: Number,
            description: String,
            required: true
        },
        language: {
            id: Number,
            name: String,
            required: true
        }
    },
        {
            timestamps:true
        }
)

submit_GETSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id:'ticketNums',
    start_sq:100
})

const submit_GETData = mongoose.model('Submit_GET', submit_GETSchema )

export default submit_GETData

