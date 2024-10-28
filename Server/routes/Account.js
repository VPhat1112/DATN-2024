import * as controller from "../controllers";
import express from "express";
const {SignUpValidation} = require('../helpers/validation')
const router = express.Router();

router.post("/register",controller.registerUser);
router.post("/registerCompany",controller.registerCompany)
router.post("/loginUser", controller.loginSeeker);
router.post("/loginCompany", controller.loginCompany);
router.post("/forgotpassword", controller.forgotPassword);
router.put("/resetpassword", controller.resetPassword);
router.get("/finalregister/:token", controller.finalregister);

router.post("/login-google",controller.LoginGoogle);  

router.post("/Logout",controller.Logout)


module.exports=router;