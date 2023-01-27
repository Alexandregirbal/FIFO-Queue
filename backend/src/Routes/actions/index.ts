import express from "express";
import addActionToQueue from "./addActionToQueue";
import getActions from "./getActions";

const router = express.Router({ mergeParams: true });

router.get("/", getActions);
router.post("/", addActionToQueue)

export default router