import {describe, expect, test} from '@jest/globals';

beforeEach(() => {
  jest.resetModules()
});

describe("startCooldown", () => {
  jest.useFakeTimers();
  jest.spyOn(global, 'setTimeout');

  test("starCooldown calls callback function once after cooldown value.", () => {
    const { startCooldown } = require("../../Services/cooldown");

    const cooldownValue = 2*1000
    startCooldown(cooldownValue, () => console.log("Oblivion"));
    
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), cooldownValue);
  })
})

describe("updateLastExecutedActionDatetime", () => {
  test("updateLastExecutedActionDatetime returns a Date object that is coherent.", () => {
    const { updateLastExecutedActionDatetime } = require("../../Services/cooldown");

    const beforeCallDatetime = (new Date()).getTime()
    const resultDatetime = updateLastExecutedActionDatetime().getTime()
    const afterCallDatetime = (new Date()).getTime()
    
    expect(beforeCallDatetime).toBeLessThanOrEqual(afterCallDatetime)
    expect(beforeCallDatetime).toBeLessThanOrEqual(resultDatetime)
    expect(resultDatetime).toBeLessThanOrEqual(afterCallDatetime)
  })
})

describe("isCooldownOver", () => {
  test("isCooldownOver returns false if updateLastExecutedActionDatetime wasn't executed", () => {
    const { isCooldownOver } = require("../../Services/cooldown");
    const result = isCooldownOver()
    expect(result).toBe(false)
  })

  test("isCooldownOver returns false if cooldown is not over", () => {
    const { isCooldownOver, startCooldown } = require("../../Services/cooldown");
    startCooldown(
      1*1000,
      () => console.log("Oblivion")
    )
    const result = isCooldownOver()
    expect(result).toBe(false)
  })

  test("isCooldownOver returns true if cooldown is over", () => {
    const { isCooldownOver, startCooldown } = require("../../Services/cooldown");
    startCooldown(
      1*1000,
      () => {
        const result = isCooldownOver()
        expect(result).toBe(true)
      }
    )
  })
})