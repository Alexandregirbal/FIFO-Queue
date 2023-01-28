import HttpException from "../../Exceptions/http";
import { NextFunction, Request, Response } from "express";
import { addActionToQueue, getQueue } from "../../Services/queue";
import { startExecutor } from "../../Executor";
import { actionIsInCurrentActions } from "../../Services/action";

export default async (req: Request, res: Response, next: NextFunction) => {
    const { action } = req.body as unknown as { action: string };
    if (!actionIsInCurrentActions(action)) {
        throw new Error(`Action ${action} is not supported on this system - addActionToQueue.`)
    }
    const queue = getQueue();
    if (queue.length === 0){
        startExecutor()
    }
    try {
        const queue = addActionToQueue(action);
        return res.status(200).send(queue);
    } catch (error: any) {
        next(new HttpException(400, error?.message))
    }
}