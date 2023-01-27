import express, { Request, Response } from "express";
import actionsRoutes from "./actions";
import queueRoutes from "./queue";

const router = express.Router({ mergeParams: true });

router.use("/actions", actionsRoutes);
router.use("/queue", queueRoutes);

router.get("*", (req: Request, res: Response) => {
    return res.status(404).send({message: "This endpoint does not exist."})
})  

export default router;