import * as controller from "../controllers";
import express from "express";
const router = express.Router();

router.get("/get-all-notification/:account_id",controller.AllNotification);
router.get("/get-all-notification-hidden/:account_id",controller.AllNotificationHidden);
router.put("/hidden-notification/:account_id/:noti_id",controller.HiddenNotification);
router.put("/visible-notification/:account_id/:noti_id",controller.VisibleNotification);

module.exports=router;