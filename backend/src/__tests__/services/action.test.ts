import {describe, expect, test} from '@jest/globals';
import { Action } from "../../Services/action/types";
// I am NOT using global import because I want the module to be clean on every test.
// import { getCurrentActions } from "../../Services/action";

const mockActions: Action[] = [
    {
        type: "A",
        credits: 100,
    },
    {
        type: "B",
        credits: 100,
    },
]

beforeEach(() => {
    jest.resetModules()
});


describe('getCurrentActions default', () => {
    
    test("Default actions should be an array", () => {
        const { getCurrentActions } = require("../../Services/action");
        const defaultActions = getCurrentActions()
        expect(defaultActions).toBeInstanceOf(Array)
    })

    test("Default actions should have 5 elements", () => {
        const { getCurrentActions } = require("../../Services/action");
        const defaultActions = getCurrentActions()
        expect(defaultActions).toHaveLength(5)
    })

    test("Default first action should have maximum 20 credits and be of type A", () => {
        const { getCurrentActions } = require("../../Services/action");
        const defaultActions = getCurrentActions()
        const firstAction = defaultActions[0]
        expect(firstAction.credits).toBeLessThanOrEqual(20)
        expect(firstAction.type).toBe("A")
    })

})


describe('getCurrentActions custom', () => {
    
    test("Custom actions should have 2 elements", () => {
        const { getCurrentActions } = require("../../Services/action");
        const customActions = getCurrentActions(
            mockActions,
            0.5,
            1
        )
        expect(customActions).toHaveLength(2)
    })

    test("Custom first action should have between 50 and 100 credits and be of type A", () => {
        const { getCurrentActions } = require("../../Services/action");
        const customActions = getCurrentActions(
            mockActions,
            0.5,
            1
        )
        const firstAction = customActions[0]
        expect(firstAction.credits).toBeGreaterThanOrEqual(50)
        expect(firstAction.credits).toBeLessThanOrEqual(100)
        expect(firstAction.type).toBe("A")
    })
})

describe("decrementCredits", () => {
    test("decrementCredits should decrement the credits of the action", () => {
        const { getCurrentActions, decrementCredits } = require("../../Services/action");
        const customActions = getCurrentActions(
            mockActions,
            0.5,
            1
        )
        const firstAction = customActions[0]
        const initialCredits = firstAction.credits
        decrementCredits("A")
        expect(firstAction.credits).toBe(initialCredits - 1)
    })

    test("decrementCredits should throw an error if an unknown action type is used", () => {
        const { getCurrentActions, decrementCredits } = require("../../Services/action");
        getCurrentActions(
            mockActions,
            0.5,
            1
        )
        const t = () => {
            decrementCredits("Z")
        };
        expect(t).toThrow(Error);
        expect(t).toThrow("Action Z is not supported on this system - decrementCredits.");
    })

    test("decrementCredits should throw an error if the credits are 0 or bellow", () => {
        const { getCurrentActions, decrementCredits } = require("../../Services/action");
        const actions: Action[] = getCurrentActions(
            mockActions,
        )
        const firstElementCredits = actions[0].credits // need to stay constant to avoid modification in loop
        const firstElementType = actions[0].type // need to stay constant to avoid modification in loop
        for (let index = 1; index <= firstElementCredits; index++) {
            decrementCredits(firstElementType)
        }
        
        const t = () => {
            decrementCredits(firstElementType)
        };
        expect(t).toThrow(Error);
        expect(t).toThrow(`Action ${firstElementType} has no credits left.`);
    })

})

describe("resetCurrentActions", () => {
    test("resetCurrentActions should reset the actions as expected.", () => {
        const { getCurrentActions, resetCurrentActions } = require("../../Services/action");
        const actions = getCurrentActions()
        expect(actions[0].credits).toBeLessThanOrEqual(20)
        expect(actions[1].credits).toBeLessThanOrEqual(20)
        expect(actions[2].credits).toBeLessThanOrEqual(30)
        expect(actions[3].credits).toBeLessThanOrEqual(10)
        expect(actions[4].credits).toBeLessThanOrEqual(2)
        
        const newActions = resetCurrentActions(
            mockActions,
            1,
            1
        )
        expect(newActions[0].type).toBe("A")
        expect(newActions[0].credits).toBe(100)
        expect(newActions[1].type).toBe("B")
        expect(newActions[1].credits).toBe(100)
    })
})
