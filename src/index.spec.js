const { Grid, newGridFromState } = require('./index');

const initState = [
  [ false, false, false, false, false ],
  [ false, false, true, false, false ],
  [ false, false, false, true, false ],
  [ false, true, true, true, false ],
  [ false, false, false, false, false ]
];

test("new Grid of non-positive number values should fail gracefully", () => {
    expect(() => {new Grid(-10, 10)}).toThrow();
    expect(() => {new Grid(10, -10)}).toThrow();
    expect(() => {new Grid('x', -10)}).toThrow();
    expect(() => {new Grid(10, 'y')}).toThrow();
    expect(() => {new Grid(true, 10)}).toThrow();
    expect(() => {new Grid(-Infinity, 10)}).toThrow();
});

test("Inifinity in an axis should fail gracefully", () => {
    expect(() => {new Grid(Infinity, 10)}).toThrow();
    expect(() => {new Grid(10, Infinity)}).toThrow();
});

test("new Grid of 10,10", () => {
    const grid = new Grid(10, 10);
    expect(grid.x).toEqual(10);
    expect(grid.y).toEqual(10);
});

test("Get value at x=1, y=2", () => {
  const grid = newGridFromState(initState);
  expect(grid.get(1, 2)).toEqual(true);
});

test("Setting non-boolean values as state should fail gracefully", () => {
  const grid = new Grid(10, 10);
  expect(() => {grid.set(6, 6, 6)}).toThrow();
  expect(() => {grid.set(6, 6, "on")}).toThrow();
});

test("Set value at x=2, y=3", () => {
  const grid = new Grid(10, 10);
  grid.set(2, 3, true);
  expect(grid.get(2, 3)).toEqual(true);
});

test("Toggle value at x=4, y=5", () => {
  const grid = new Grid(10, 10);
  grid.toggle(4, 5);
  expect(grid.get(4, 5)).toEqual(true);
});

test("Importing JSON represenation of grid state", () => {
  const grid = newGridFromState(initState);
  expect(grid.dump()).toEqual(JSON.stringify(initState));
});

test("Get neighbour states", () => {
  const grid = newGridFromState(initState);
  expect(JSON.stringify(grid.neighbourStates(2, 2))).toEqual(JSON.stringify({"live":5,"dead":3}));
  expect(JSON.stringify(grid.neighbourStates(0, 3))).toEqual(JSON.stringify({"live":1,"dead":4}));
  expect(JSON.stringify(grid.neighbourStates(3, 0))).toEqual(JSON.stringify({"live":1,"dead":4}));
  expect(JSON.stringify(grid.neighbourStates(4, 3))).toEqual(JSON.stringify({"live":2,"dead":3}));
  expect(JSON.stringify(grid.neighbourStates(2, 4))).toEqual(JSON.stringify({"live":2,"dead":3}));
  expect(JSON.stringify(grid.neighbourStates(0, 0))).toEqual(JSON.stringify({"live":0,"dead":3}));
  expect(JSON.stringify(grid.neighbourStates(4, 4))).toEqual(JSON.stringify({"live":1,"dead":2}));
});
