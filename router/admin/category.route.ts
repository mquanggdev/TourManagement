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
router.get("/edit/:id" , controller.edit);
router.patch("/edit/:id" ,upload.single("image") ,
uploadSingle , controller.editPatch)
router.patch("/delete/:id" , controller.deleteCategory) ;
router.get("/detail/:id" , controller.detail);
export const categoryRoute = router;