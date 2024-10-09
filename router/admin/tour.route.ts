import express from "express";
const router = express.Router();

import * as controller from "../../controllers/admin/tour.controller";
router.get("/", controller.index);
router.get("/create" , controller.create);
router.post("/create" , controller.createPost);
export const tourRoute = router;