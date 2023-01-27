import { resetCurrentActions } from "../action";
import { COOLDOWN } from "../../constants"
import { startExecutor } from "../executor";

let lastExecutedActionDatetime: Date | undefined = undefined

const afterCooldown = () => {
    console.log("Cooldown is done.");
    resetCurrentActions()
    console.log("Actions are reset.");
    startExecutor()
    console.log("Executor started back.");
}

export const startCooldown = () => {
    setTimeout(afterCooldown, COOLDOWN)
    console.log("Cooldown started.");
}

export const updateLastExecutedActionDatetime = () => {
    lastExecutedActionDatetime = new Date()
}

export const isCooldownOver = () => {
    if (!lastExecutedActionDatetime) {
        return false
    }
    const now = new Date()
    const cooldownOver = now.getTime() - lastExecutedActionDatetime.getTime() > COOLDOWN
    return cooldownOver
}