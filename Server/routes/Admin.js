import * as controller from "../controllers";
import express from "express";
const router = express.Router();

router.get("/get-total-new-user-day", controller.TotalNewUserDay);
router.get("/get-total-new-user-month", controller.TotalNewUserMonth);
router.get("/get-total-company-month",controller.TotalCompanyMonth);
router.get("/get-total-applycv-each-month",controller.TotalApplyCvYear);
router.get("/get-total-jobs-each-month",controller.TotalJobsYear);
router.get("/get-total-applycv-month",controller.TotalApplyMonth)
router.get("/get-percent-users-companies",controller.PercentUsersAndCompanies)

router.get("/allSpe",controller.AllSpe);

router.put("/:SpID?",controller.updateSpe);
router.delete("/:SpId",controller.DetleteSpe);

router.post(
    "/filter-users",
    controller.filterUsers
);

router.get("/get-all-user",controller.AllUSer);
router.get("/get-all-company",controller.AllCompany);
router.get("/get-user-by-id/:userID",controller.getUserByID)

module.exports=router;