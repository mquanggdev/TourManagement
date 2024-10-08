import express from "express";
const router = express.Router();

import * as controller from "../../controllers/admin/tour.controller";
router.get("/", controller.index);

export const tourRoute = router;