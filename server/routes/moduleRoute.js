import express from 'express'
//import {getAllUsers, createUser, updateUser, deleteUser} from '../controllers/usersControllers.js'
import { getAllModules, createModule,} from '../controllers/moduleController.js'
const router = express.Router()

router.route('/')
    .get(getAllModules)
    .post(createModule)

    export { router as modules }