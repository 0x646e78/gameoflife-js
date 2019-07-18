const { terminalGrid } = require('../src/terminalGrid');

test("Border value of non whole number should fail gracefully", () => {
    expect(() => {new terminalGrid({border:1.5})}).toThrow();
    expect(() => {new terminalGrid({border:Infinity})}).toThrow();
    expect(() => {new terminalGrid({border:"NaN"})}).toThrow();
});

test("Border value too large should fail gracefully", () => {
    expect(() => {new terminalGrid({border:5000})}).toThrow();
    expect(() => {new terminalGrid({x: 10, y:10, border:6})}).toThrow();
    expect(() => {new terminalGrid({x: 10, y:10, border:4})}).toBeTruthy();
});

test("Border value larger than hould fail gracefully", () => {
    expect(() => {new terminalGrid({border:5000})}).toThrow();
});

test("X,Y within terminal size should be truthful", () => {
    expect(() => {new terminalGrid({x:10, y:10})}).toBeTruthy();
});

test("X,Y larger than terminal size should fail gracefully", () => {
    expect(() => {new terminalGrid({x:5000, y:1})}).toThrow();
    expect(() => {new terminalGrid({x:5000, y:5000})}).toThrow();
    expect(() => {new terminalGrid({x:1, y:5000})}).toThrow();
});


