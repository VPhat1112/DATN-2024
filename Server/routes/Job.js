import * as controller from "../controllers";
import express from "express";
const router = express.Router();

router.get("/",controller.getJobs)
router.get("/:jid",controller.getJob);
router.post("/",controller.createJob);
router.put("/:pid",controller.updateJobs);
router.get("/Company/:Cid",controller.getJobCompany);
router.post("/filter-job",controller.filterJobs);
router.post("/Company/:Cid",controller.filterJobsCompany);
router.get("/SpeByJob/:Jid",controller.SpeByJob);
router.get("/JobBySpe/:Sid",controller.getJobBySPe);

module.exports=router;