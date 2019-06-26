export const sumOfTwoInteger = (x, y) => x + y;
export const diffOfTwoInteger = (x, y) => x - y;

function makeGrid(x, y){
  const grid = [...Array(x)].map(() =>
    ([...Array(y)].map(() => false))
  );
  return grid
}

function assertIsValidAxisValue(n){
  if (typeof(n) !== 'number'){
    throw new Error("Expected a number")
  }
  if (n < 1){
    throw new Error("Expected a positive number")
  }
  if (n === Infinity){
    throw new Error("Infinity currently not supported")
  }
}

function assertIsBoolean(b){
  if (typeof(b) !== 'boolean'){
    throw new Error("State can only be true or false")
  }
}

export class Grid {
  constructor(x, y){
    [x,y].forEach((e) => assertIsValidAxisValue(e));
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
  dump(){
    console.log(JSON.stringify(this.grid));
  }
}
