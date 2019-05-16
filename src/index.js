export const sumOfTwoInteger = (x, y) => x + y;

export const diffOfTwoInteger = (x, y) => x - y;

export class Grid {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.grid = []
    for (let i = 0; i < x; i++){
      const r = []
      for (let j = 0; j < y; j++){
        r.push(false);
      }
      this.grid.push(r);
    }
  }
  get(x, y){
    return this.grid[x][y];
  }
}
