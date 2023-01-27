import express from "express";
import getQueue from "./getQueue"

const router = express.Router({ mergeParams: true });

router.get("/", getQueue);

export default router