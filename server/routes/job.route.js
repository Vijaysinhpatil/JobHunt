import express from "express"
import { getAdminJob, GetJobById, GetJobs, postJob } from "../controller/job.controller.js"
import isAuthenticated from "../middleware/user.auth.js";
const router = express.Router()

router.route('/postJob').post( isAuthenticated, postJob)
router.route('/getAlljobs').get(isAuthenticated , GetJobs)
router.route('/getJobById/:id').get(isAuthenticated , GetJobById)
router.route('/adminJobs').get(isAuthenticated , getAdminJob)
export default router;