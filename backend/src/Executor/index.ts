import { decrementCredits } from "../Services/action";
import { startCooldown, updateLastExecutedActionDatetime } from "../Services/cooldown";
import { EXECUTION_INTERVAL } from "../constants";
import { getQueue, shiftActionFromQueue } from "../Services/queue";

let intervalObject: NodeJS.Timeout|undefined = undefined

const execute = () => {
    console.log("Executing action from queue...");
    const actionToShift = getQueue()[0]
    if (!actionToShift) {
        console.log("Queue is empty.");        
        stopExecutor()
        return undefined
    }    
    try {
        decrementCredits(actionToShift)
    } catch (error) {
        if (error instanceof Error) {
            console.error(error?.message)
            stopExecutor()
            startCooldown()
            return undefined
        }
    }
    shiftActionFromQueue()
    updateLastExecutedActionDatetime()
}

export const startExecutor = (
    executorCallback: () => any = execute,
) => {
    console.log("Starting executor loop...");
    intervalObject = setInterval(
        () => executorCallback(),
        EXECUTION_INTERVAL
    );
}

export const stopExecutor = () => {
    if (!intervalObject) {
        return
    }
    clearInterval(intervalObject)
    console.log("Executor loop stoped.");
}