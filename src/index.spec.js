import { sumOfTwoInteger } from "./index"
import { diffOfTwoInteger } from "./index"
import { Grid } from "./index"

test("sum of 1 and 4 should return 5", () => {
    expect(sumOfTwoInteger(1, 4)).toEqual(5);
});

test("diff of 5 and 4 should return 1", () => {
    expect(diffOfTwoInteger(5, 4)).toEqual(1);
});

test("new Grid of 10,10", () => {
    const grid = new Grid(10, 10);
    expect(grid.x).toEqual(10);
    expect(grid.y).toEqual(10);
});

