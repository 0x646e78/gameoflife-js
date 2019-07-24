function makeGrid(x, y){
  const grid = [...Array(x)].map(() =>
    ([...Array(y)].map(() => false))
  );
  return grid;
}

function assertIsValidAxisValue(n){
  if (typeof(n) !== 'number'){
    throw new Error("Expected a number");
  }
  if (n < 1){
    throw new Error("Expected a positive number");
  }
  if (n === Infinity){
    throw new Error("Infinity currently not supported");
  }
}

function assertIsBoolean(b){
  if (typeof(b) !== 'boolean'){
    throw new Error("State can only be true or false");
  }
}

function between(min, max, value) {
  return (min < value) && (value < max);
}

function decideRandom() {
  return Math.round(Math.random() * 100) > 70;
}

function decideFate(currState, neighbourStates) {
  /*
  1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
  2. Any live cell with two or three live neighbours lives on to the next generation.
  3. Any live cell with more than three live neighbours dies, as if by overpopulation.
  4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.  
  */
  if (currState) {
    if (neighbourStates.live < 2) {
      return false;
    } else if (neighbourStates.live > 3) {
      return false;
    } else {
      return true;
    }
  } else {
    return (neighbourStates.live === 3);
  }
}

function newGridFromState(state){
  const grid = new Grid(state.length, state[0].length);
  state.forEach((row, x) => {
    row.forEach((cellState, y) => {
      grid.set(x, y, cellState);
    });
  });
  return grid;
}

class Grid {
  constructor(x, y){
    [x,y].forEach(assertIsValidAxisValue);
    this.x = x;
    this.y = y;
    this.grid = makeGrid(x, y);
  }
  get(x, y){
    return this.grid[x][y];
  }
  set(x, y, state){
    assertIsBoolean(state);
    this.grid[x][y] = state;
  }
  toggle(x, y){
    this.set(x, y, !this.grid[x][y]);
  }
  next(){
    this.grid = this.grid.map((row, indexX) => {
      return row.map((cell, indexY) => {
        return decideFate(cell, this.neighbourStates(indexX, indexY));
      });
    });
  }
  randomise(){
    this.grid = this.grid.map((row) => {
      return row.map(() => {
        return decideRandom();
      });
    });
  }
  neighbourStates(x, y){
    const n = { "live": 0, "dead": 0 };
    [(x - 1), x, (x + 1)].forEach((cellx) => {
      if (between(-1, this.grid.length, cellx)) {
        [(y -1), y, (y + 1)].forEach((celly) => {
          if (between(-1, this.grid[cellx].length, celly) && (! (cellx === x && celly === y))) {
            if (this.get(cellx, celly)) {
              n['live'] += 1;
            } else {
              n['dead'] += 1;
            }
          }
        });
      }
    });
    return n;
  }
  dump(){
    return JSON.stringify(this.grid);
  }
}

module.exports = {
  newGridFromState,
  Grid,
};
