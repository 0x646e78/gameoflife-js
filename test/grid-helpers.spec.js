const { startCoord, assertIsBoolean, assertIsWholeNumber } = require('../src/grid-helpers');

test("new Grid of non-positive number values should fail gracefully", () => {
    expect(() => {assertIsBoolean('z').toThrow()});
});
