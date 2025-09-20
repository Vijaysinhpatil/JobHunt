import express, { Router } from 'express'
import {Login, Logout, register, updateProfile} from '../controller/user.controller.js'
import  isAuthenticated  from '../middleware/user.auth.js'
const router = express.Router()

router.route('/register').post( register) 
router.route('/login').post( Login)
router.route('/logout').get(Logout)
router.route('/updateProfile').post(isAuthenticated , updateProfile)


export default router;