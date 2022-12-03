
import express from 'express'
import loginLimiter from '../middleware/loginlimit.js'
import authController from '../controllers/authController.js'
const router = express.Router()

router.route('/').post(authController.login)
router.route('./refresh').get(authController.refresh)
router.route('/logout').post(authController.logout)

export { router as auth }