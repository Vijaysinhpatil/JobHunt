import exprees from "express"
import isAuthenticated from "../middleware/user.auth.js"
import { applyJob, getApplicant, getAppliedJobs, updateStatus } from "../controller/application.controller.js";
const router = exprees.Router();

router.route("/applyJob/:jobId").get(isAuthenticated , applyJob)
router.route('/get').get(isAuthenticated , getAppliedJobs)
router.route('/:id/getApplicant').get(isAuthenticated , getApplicant)
router.route('/status/:id/update').post(isAuthenticated , updateStatus)
export default router