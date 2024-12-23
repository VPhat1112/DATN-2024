import * as controller from "../controllers";
import express from "express";
const router = express.Router();

router.get("/:id",controller.AllAppLyCvCon)

router.get("/CvByID/:id",controller.getCvById)


module.exports=router;