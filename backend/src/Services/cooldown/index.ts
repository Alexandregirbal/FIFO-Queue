import { resetCurrentActions } from "../action";
import { COOLDOWN } from "../../constants"
import { startExecutor } from "../../Executor";

let lastExecutedActionDatetime: Date | undefined = undefined

const afterCooldown = () => {
    console.log("Cooldown is done.");
    resetCurrentActions()
    console.log("Actions are reset.");
    startExecutor()
    console.log("Executor started back.");
}

export const startCooldown = (
    cooldown: number = COOLDOWN,
    callback: () => void = afterCooldown,
): NodeJS.Timeout => {
    const timeoutObject = setTimeout(callback, cooldown)
    console.log("Cooldown started.");
    return timeoutObject
}

export const updateLastExecutedActionDatetime = (): Date => {
    lastExecutedActionDatetime = new Date()
    return lastExecutedActionDatetime
}

export const isCooldownOver = (
    cooldown: number = COOLDOWN
): boolean => {
    if (!lastExecutedActionDatetime) {
        return false // because it never began
    }
    const now = new Date()
    const cooldownOver = now.getTime() - lastExecutedActionDatetime.getTime() > cooldown
    return cooldownOver
}