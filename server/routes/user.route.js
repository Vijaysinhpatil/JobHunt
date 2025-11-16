import express, { Router } from 'express'
import {Login, Logout, register, updateProfile} from '../controller/user.controller.js'
import  isAuthenticated  from '../middleware/user.auth.js'
import { singleUpload } from '../middleware/multer.js'
import { ensureDbConnection } from '../middleware/dbConnection.js';
const router = express.Router()


// Apply DB connection middleware to all routes
router.use(ensureDbConnection);

router.route('/register').post( singleUpload, register) 
router.route('/login').post(Login)
router.route('/logout').get(Logout)
router.route('/updateProfile').post(isAuthenticated ,singleUpload , updateProfile)



export default router;
