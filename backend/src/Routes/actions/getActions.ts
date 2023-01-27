import { Request, Response } from "express";
import { getCurrentActions } from "../../Services/action";

export default async (req: Request, res: Response) => {
    return res.status(200).send(getCurrentActions())
}