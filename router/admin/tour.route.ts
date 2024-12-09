import express from "express";
const router = express.Router();
import multer from "multer" ;
import { uploadFields } from "../../middlewares/admin/uploadCloud.middleware";

const upload = multer() ;

import * as controller from "../../controllers/admin/tour.controller";
router.get("/", controller.index);
router.get("/detail/:id" , controller.detail);
router.get("/create" , controller.create);
router.post("/create" ,upload.fields([{name : "images" ,maxCount : 10}]) ,
uploadFields ,controller.createPost);
router.get("/edit/:id" , controller.edit);
export const tourRoute = router;