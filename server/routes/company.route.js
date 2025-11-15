import express from "express";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controller/company.controller.js";
import isAuthenticated from "../middleware/user.auth.js";
import { singleUpload } from '../middleware/multer.js'
const router = express.Router()

router.route('/registerCompany').post( isAuthenticated, registerCompany)
router.route('/getComDet').get(isAuthenticated , getCompany)
router.route('/getComById/:id').get(isAuthenticated , getCompanyById)
router.route('/Update/:id').put(isAuthenticated , singleUpload , updateCompany)
export default router