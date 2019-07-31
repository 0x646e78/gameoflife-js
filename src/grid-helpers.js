function startCoord(maxwidth, dimension, border) {
  return (((maxwidth - (border * 2) - dimension) / 2) + border + 1);
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
  startCoord,
  assertIsBoolean,
  assertIsWholeNumber,
};
