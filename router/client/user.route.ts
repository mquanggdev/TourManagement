import express from "express";
const router = express.Router();
import * as controller from "../../controllers/client/user.controller";
import { requireAuth } from "../../middlewares/client/users.middleware";
router.get("/register" , controller.register);
router.post("/register", controller.registerPost);
router.get("/login", controller.login);
router.post("/login" , controller.loginPost) ;
router.get("/logout", controller.logout);
router.get("/password/forgot", controller.forgotPassword);
router.post("/password/forgot", controller.forgotPasswordPost);
router.get("/password/otp", controller.otpPassword);
router.post("/password/otp", controller.otpPasswordPost);
router.get("/password/reset", requireAuth,controller.resetPassword);
router.patch("/password/reset" ,requireAuth, controller.resetPasswordPatch)
router.get("/profile" ,requireAuth, controller.profile)
export const userRoute = router;