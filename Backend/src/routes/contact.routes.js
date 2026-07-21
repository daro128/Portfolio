import express from "express";
const router = express.Router();

import  sendContact  from "../controllers/contactcontroller.js";

router.post("/", sendContact);

export default router;