import express from 'express'
import { PostContact } from '../controller/contact.controller.js'
const router = express.Router()

router.route('/feedback').post(PostContact)

export default router