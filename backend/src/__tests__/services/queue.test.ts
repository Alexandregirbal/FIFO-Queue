import {describe, expect, test} from '@jest/globals';

beforeEach(() => {
  jest.resetModules()
});

describe("getQueue & addActionToQueue", () => {
  test("getQueue returns an array", () => {
    const { getQueue } = require("../../Services/queue");
    const queue = getQueue()
    expect(queue).toBeInstanceOf(Array)
  })

  test("getQueue returns an empty array", () => {
    const { getQueue } = require("../../Services/queue");
    const queue = getQueue()
    expect(queue).toHaveLength(0)
  })

  test("getQueue & addActionToQueue return arrays with 1 element", () => {
    const { getQueue, addActionToQueue } = require("../../Services/queue");
    const queue = addActionToQueue("A")
    expect(queue).toHaveLength(1)

    const queueFromGet = getQueue()
    expect(queueFromGet).toHaveLength(1)
  })

  test("getQueue returns an array with 5 element", () => {
    const { getQueue, addActionToQueue } = require("../../Services/queue");
    for (let i = 0; i < 5; i++) {
      addActionToQueue("A")
    }

    const queueFromGet = getQueue()
    expect(queueFromGet).toHaveLength(5)
  })
})

describe("shiftActionFromQueue", () => {
  test("shiftActionFromQueue returns undefined when queue is empty", () => {
    const { shiftActionFromQueue } = require("../../Services/queue");
    const shiftedAction = shiftActionFromQueue()
    expect(shiftedAction).toBeUndefined()
  })

  test("shiftActionFromQueue returns element", () => {
    const { shiftActionFromQueue, addActionToQueue } = require("../../Services/queue");
    const action = "A"
    const queue = addActionToQueue(action)
    expect(action).toBe(queue[0])

    const shiftedAction = shiftActionFromQueue()
    expect(shiftedAction).toBe(action)
  })

})