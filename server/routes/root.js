import express from 'express'
import { dirname } from 'path'
import {fileURLToPath} from 'url'
import path from 'path'

const router = express.Router()
const __dirname = dirname(fileURLToPath(import.meta.url))


router.get('^/$|/index(.html)?',(req,res) => {
    res.sendFile(path.join(__dirname,'..','views','index.html'))
})

export { router as root }
