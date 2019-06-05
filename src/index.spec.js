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

test("Get value at x=2, y=3", () => {
  const grid = new Grid(10, 10);
  expect(grid.get(2, 3)).toEqual(false);
});

test("Set value at x=2, y=3", () => {
  const grid = new Grid(10, 10);
  grid.set(2, 3, true)
  expect(grid.get(2, 3)).toEqual(true);
});

test("Toggle value at x=4, y=5", () => {
  const grid = new Grid(10, 10);
  grid.toggle(4, 5)
  expect(grid.get(4, 5)).toEqual(true);
});
