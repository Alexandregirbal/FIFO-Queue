import { resetCurrentActions } from "../action";
import { startExecutor } from "../../Executor";

export const afterCooldown = () => {
    console.log("Cooldown is done.");
    resetCurrentActions()
    console.log("Actions are reset.");
    startExecutor()
    console.log("Executor started back.");
}