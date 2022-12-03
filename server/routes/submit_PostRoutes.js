import express from 'express'
//import {getAllUsers, createUser, updateUser, deleteUser} from '../controllers/usersControllers.js'
import { getAllSubmits, createSubmit } from '../controllers/submit_PostController.js'
const router = express.Router()

router.route('/')
    .get(getAllSubmits)
    .post(createSubmit)

    export { router as submit_Posts }