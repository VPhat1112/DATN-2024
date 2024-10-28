import * as controller from "../controllers";
import express from "express";
const router = express.Router();

router.get("/",controller.getJobs);
router.get("/:id",controller.getJob);
router.post("/",controller.addJob);
router.delete("/:id",controller.deleteJob);
router.update("/:id",controller.updatePost);