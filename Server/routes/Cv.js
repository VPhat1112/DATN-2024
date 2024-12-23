import * as controller from "../controllers";
import express from "express";
const router = express.Router();

router.get("/get-all-cv/:seekerid",controller.getallCv);
router.get("/get-cv-by-seeker/:seeker_id/:cv_id",controller.getCvbySeekerId);

router.delete("/delete-cv/:CvId",controller.deleteCv);

// update
router.put("/update-cv/:CvId?",controller.updateCv);
// update Eid params
router.put("/Update-Exp/:Eid?",controller.updateExp);

router.put("/Update-Edu/:Did?",controller.updateEdu);
router.put("/Update-Ski/:Sid?",controller.updateSkill);
router.put("/Update-Pro/:Pid?",controller.updateProject);
router.put("/Update-Lan/:Lid?",controller.updateLanguege);
router.put("/Update-Infor-Job/:Info_id?",controller.updateInformationJob);

router.put("/:Jid/:CVid",controller.ApplyCv);

router.put("/accept/:dec/:Cv_id",controller.AcceptCVCon)

router.get("/get-cv-by-id/:id",controller.getCvById)

router.get("/Company/get-cv-by-Job/:Jid",controller.getCvByJob)
router.get("/Company/get-cv-by-Job-Deny/:Jid",controller.getCvByJobDeny)
router.get("/Company/get-cv-by-Job-Accept/:Jid",controller.getCvByJobAccept)


module.exports=router;