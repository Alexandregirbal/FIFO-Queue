import { Action } from "./Services/action/types"

export const EXECUTION_INTERVAL = 6*1000 // 2 minutes
export const COOLDOWN = 20*1000 // 24 hours
export const MIN_CREDITS_PERCENTAGE = 0.8 // 80%
export const MAX_CREDITS_PERCENTAGE = 1 // 100%

export const ACTIONS: Action[] = [
    {
        type: "A",
        credits: 20,
    },
    {
        type: "B",
        credits: 20,
    },
    {
        type: "C",
        credits: 30,
    },
    {
        type: "D",
        credits: 10,
    },
    {
        type: "E",
        credits: 2,
    }
]