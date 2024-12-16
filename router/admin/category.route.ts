import express from "express";
const router = express.Router();
import multer from "multer" ;
import { uploadSingle } from "../../middlewares/admin/uploadCloud.middleware";

const upload = multer() ;

import * as controller from "../../controllers/admin/category.controller";
router.get("/", controller.index);
router.get("/create" , controller.create);
router.post("/create" ,upload.single("image") ,
uploadSingle , controller.createPost);
export const categoryRoute = router;