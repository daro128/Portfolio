import express from "express";
const router = express.Router();

import sendComment from "../controllers/commentcontroller.js";

router.post("/", sendComment);

export default router;
