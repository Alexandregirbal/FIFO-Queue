import { EXECUTION_INTERVAL } from "../../constants";
import { shiftActionFromQueue } from "../queue";

let intervalObject: NodeJS.Timeout|undefined = undefined

export const startExecutor = () => {
    console.log("Starting executor loop...");
    intervalObject = setInterval(
        () => shiftActionFromQueue(),
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