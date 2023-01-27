import { decrementCredits } from "../action"
import { ACTIONS } from "../../constants"
import { startExecutor, stopExecutor } from "../executor"
import { startCooldown, updateLastExecutedActionDatetime } from "../cooldown"

let queue: string[] = []

export const getQueue = (): string[] => {
    return queue
}

export const addActionToQueue = (actionType: string): string[] => {
    if (queue.length === 0){
        startExecutor()
    }
    if (!ACTIONS.map(action => action.type).includes(actionType)) {
        throw new Error(`Action ${actionType} is not supported on this system - addActionToQueue.`)
    }
    queue.push(actionType)
    return queue
}

export const shiftActionFromQueue = (): string | undefined => {
    console.log("Shifting action from queue...");
    const actionToShift = queue[0]
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
    
    const shiftedAction = queue.shift()
    updateLastExecutedActionDatetime()
    console.log("Action shifted from queue: ", shiftedAction);
    return shiftedAction
}