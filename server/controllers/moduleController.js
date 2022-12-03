import Module from '../models/module.js'
import asyncHandler from "express-async-handler"

const getAllModules = asyncHandler(async (req, res) => {
    const modules = await Module.find().lean()
    if(!modules?.length) {
        return res.status(400).json({message : 'No modules found'})
    }

    res.json(modules)
})

const createModule = asyncHandler(async (req, res) => {
        const {module_name,language_id,language,Blob_Desc,Full_Desc,Example,testcases,boilercode,Reward,output} = req.body
    
        if (!module_name || !language_id || !language || !Blob_Desc || !Full_Desc || !Example || !testcases || !boilercode || !Reward || !output) {
            return res.status(400).json({message : 'All fields are required'})
        }
    
        const module = Module.create({module_name,language_id,language,Blob_Desc,Full_Desc,Example,testcases,boilercode,Reward,output})
    
        if (module) { 
            return res.status(201).json({ message: 'Module added to database' })
        } else {
            return res.status(400).json({ message: 'Module failed to manifest' })
        }
    
    
    })

export  {getAllModules, createModule} 