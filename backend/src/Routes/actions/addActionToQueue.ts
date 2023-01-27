import HttpException from "../../Exceptions/http";
import { NextFunction, Request, Response } from "express";
import { addActionToQueue } from "../../Services/queue";

export default async (req: Request, res: Response, next: NextFunction) => {
    const { action } = req.body as unknown as { action: string };
    try {
        const newQueue = addActionToQueue(action);
        return res.status(200).send(newQueue);
    } catch (error: any) {
        next(new HttpException(400, error?.message))
    }
}