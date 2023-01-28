let queue: string[] = []

export const getQueue = (): string[] => {
    return queue
}

export const addActionToQueue = (actionType: string): string[] => {
    queue.push(actionType)
    return queue
}

export const shiftActionFromQueue = (): string | undefined => {
    const shiftedAction = queue.shift()
    console.log("Action shifted from queue:", shiftedAction);
    return shiftedAction
}