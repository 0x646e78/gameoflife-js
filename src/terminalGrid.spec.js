const { terminalGrid } = require('./terminalGrid');

test("Border of non whole number should fal gracefully", () => {
    expect(() => {new terminalGrid({border:1.5})}).toThrow();
    expect(() => {new terminalGrid({border:Infinity})}).toThrow();
    expect(() => {new terminalGrid({border:"NaN"})}).toThrow();
});
