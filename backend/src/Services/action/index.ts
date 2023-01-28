import { isCooldownOver } from "../cooldown";
import { ACTIONS, MAX_CREDITS_PERCENTAGE, MIN_CREDITS_PERCENTAGE } from "../../constants";
import { Action } from "./types";
import { calculateMaxCredits } from "./utils";

let currentActions: Action[] | undefined = undefined

export const getCurrentActions = (
    actions: Action[] = ACTIONS,
    minCreditsPercentage: number = MIN_CREDITS_PERCENTAGE,
    maxCreditsPercentage: number = MAX_CREDITS_PERCENTAGE,
): Action[] => {    
    if (!currentActions || isCooldownOver()) {
        currentActions = actions.map(action => {
            return {
                ...action,
                credits: calculateMaxCredits(
                    action.credits,
                    maxCreditsPercentage,
                    minCreditsPercentage
                )
            }
        })
    }
    return currentActions
}

export const resetCurrentActions = (
    actions: Action[] = ACTIONS,
    minCreditsPercentage: number = MIN_CREDITS_PERCENTAGE,
    maxCreditsPercentage: number = MAX_CREDITS_PERCENTAGE,
): Action[] => {
    currentActions = undefined
    return getCurrentActions(
        actions,
        minCreditsPercentage,
        maxCreditsPercentage,
    )
}

export const decrementCredits = (actionType: string): void => {
    const action = currentActions?.find(action => action.type === actionType)
    
    if (!action) {
        throw new Error(`Action ${actionType} is not supported on this system - decrementCredits.`)
    }
    if (action.credits <= 0) {
        throw new Error(`Action ${actionType} has no credits left.`)
    }
    action.credits--
}