import express, { Router } from 'express'
import {Login, Logout, register, updateProfile} from '../controller/user.controller.js'
import  isAuthenticated  from '../middleware/user.auth.js'
const router = express.Router()

router.route('/register').post(isAuthenticated , register) 
router.route('/login').post(isAuthenticated , Login)
router.route('/logout').get(isAuthenticated , Logout)
router.route('/updateProfile').post(isAuthenticated , updateProfile)


export default router;