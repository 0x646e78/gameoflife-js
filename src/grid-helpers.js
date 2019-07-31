const term = require('terminal-kit');

function startX(x, border) {
  return (((term.realTerminal.width - (border * 2) - x) / 2) + border + 1);
}

function startY(y, border) {
  return (((term.realTerminal.height - (border * 2) - y) / 2) + border + 1);
}

function assertIsBoolean(b){
  if (typeof(b) !== 'boolean'){
    throw new Error("State can only be true or false");
  }
}

function assertIsWholeNumber(n) {
  if (! Number.isInteger(n)) {
    throw new Error("Should be a whole number");
  }
}


module.exports = {
  startX,
  startY,
  assertIsBoolean,
  assertIsWholeNumber,
};
