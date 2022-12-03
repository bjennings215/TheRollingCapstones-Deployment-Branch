import express from 'express'
import verifyJWT from '../middleware/verifyjwt.js'
import { dirname } from 'path'
import {fileURLToPath} from 'url'
import {getAllUsers, createUser, updateUser, deleteUser} from '../controllers/usersControllers.js'

const router = express.Router()
const __dirname = dirname(fileURLToPath(import.meta.url))


router.route('/').get(verifyJWT,getAllUsers)
.post(createUser)
.patch(updateUser)
.delete(deleteUser)

export { router as users }

