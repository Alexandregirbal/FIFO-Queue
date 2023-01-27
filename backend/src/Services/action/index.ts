import { isCooldownOver } from "../cooldown";
import { ACTIONS, MAX_CREDITS_PERCENTAGE, MIN_CREDITS_PERCENTAGE } from "../../constants";
import { Action } from "./types";
import { calculateMaxCredits } from "./utils";

let currentActions: Action[] | undefined = undefined

export const getCurrentActions = (): Action[] => {
    if (!currentActions || isCooldownOver()) {
        currentActions = ACTIONS.map(action => {
            return {
                ...action,
                credits: calculateMaxCredits(action.
                    credits,
                    MAX_CREDITS_PERCENTAGE,
                    MIN_CREDITS_PERCENTAGE
                )
            }
        })
    }
    return currentActions

}

export const resetCurrentActions = (): void => {
    currentActions = undefined
    getCurrentActions()
}

export const decrementCredits = (actionType: string): void => {
    const action = currentActions?.find(action => action.type === actionType)
    
    if (!action) {
        console.log(actionType);
        console.log(currentActions);
        console.log(action);
        throw new Error(`Action ${actionType} is not supported on this system - decrementCredits.`)
    }
    if (action.credits <= 0) {
        throw new Error(`Action ${actionType} has no credits left.`)
    }
    action.credits--
}