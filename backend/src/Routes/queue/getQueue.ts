import { Request, Response } from "express";
import { getQueue } from "../../Services/queue";

export default async (req: Request, res: Response) => {
    return res.status(200).send(getQueue())
}