import Submit_POST from '../models/submitPOST.js'
import User from "../models/User.js"
import asyncHandler from "express-async-handler"


//get submissions

const getAllSubmits = asyncHandler(async (req, res) => {
    const submits = await Submit_POST.find().lean()
    if(!submits?.length) {
        return res.status(400).json({message : 'No submissions to Judge 0 found'})
    }

    const submitsWithUser = await Promise.all(submits.map(async (submit) => {
        const user = await User.findById(submit.userID).lean().exec()
        return { ...submit, username: user.username}
    }))


    res.json(submitsWithUser)
})

//create submission
const createSubmit = asyncHandler(async (req, res) => {
    const {userID, source_code, language_id} = req.body

    if (!userID || !source_code || !language_id) {
        return res.status(400).json({message : 'All fields are required'})
    }

    const submit = Submit_POST.create({userID,source_code,language_id})

    if (submit) { 
        return res.status(201).json({ message: 'API submission added to database' })
    } else {
        return res.status(400).json({ message: 'Submission failed to manifest' })
    }


})




export  {getAllSubmits, createSubmit} 