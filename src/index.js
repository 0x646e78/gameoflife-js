export const sumOfTwoInteger = (x, y) => x + y;
export const diffOfTwoInteger = (x, y) => x - y;

function makeGrid(x, y){
  const grid = [...Array(x)].map(() =>
    ([...Array(y)].map(() => false))
  );
  return grid
}

export class Grid {
  constructor(x, y){
/*    (x < 0)
    (y < 0)
*/
    this.x = x;
    this.y = y;
    this.grid = makeGrid(x, y)
  }
  get(x, y){
    return this.grid[x][y];
  }
  set(x, y, state){
    this.grid[x][y] = state;
  }
  toggle(x, y){
    this.set(x, y, !this.grid[x][y])
  }
}
