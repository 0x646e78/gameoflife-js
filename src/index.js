export const sumOfTwoInteger = (x, y) => x + y;

export const diffOfTwoInteger = (x, y) => x - y;

const cells = [ 
  [true, true, true], 
  [true, true, false], 
  [true, false, false] ,
];

export class Grid {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}
