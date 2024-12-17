import express from "express";
const router = express.Router();
import multer from "multer" ;
import { uploadFields } from "../../middlewares/admin/uploadCloud.middleware";

const upload = multer() ;

import * as controller from "../../controllers/admin/user.controller";
router.get("/", controller.index);
export const userRoute = router;