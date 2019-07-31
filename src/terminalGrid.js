const { Grid } = require('./index');
const { startCoord, assertIsWholeNumber } = require('./grid-helpers');
const term = require('terminal-kit');

function assertBorderFits(x, y, border) {
  const b =  border * 2; 
  const msg = "Border size i" + border + " is larger than X or Y";
  if (b > x || b > y) {
    throw new Error(msg);
  }
}

function assertFitsTerm(x, y, border) {
  const w = term.realTerminal.width - (border * 2);
  const h = term.realTerminal.height - (border * 2);
  const msg = "Edge dimensions will not fit the terminal size";
  if (w < 0 || w < x) {
    throw new Error(msg);
  }
  if (h < 0 || h < y) {
    throw new Error(msg);
  }
}

class TerminalGrid {
  constructor({x=5, y=5, border=0, center=false, max=false}) {
    assertIsWholeNumber(border);
    assertBorderFits(x, y, border);
    this.border = border;
    this.live = String.fromCharCode(9617);
    this.dead = " ";
    if (max){
      x = term.realTerminal.width - (border * 2);
      y = term.realTerminal.height - (border * 2);
    }
    assertFitsTerm(x, y, border);
    if (center) {
      this.startx = startCoord(term.realTerminal.width, x, border);
      this.starty = startCoord(term.realTerminal.height, y, border);
    } else {
      this.startx = border + 1;
      this.starty = border + 1;
    }
    this.grid = new Grid(x, y);
    this.grid.randomise();
    this.term = term.realTerminal;
    this.term.clear();
  }
  next() {
    this.grid.next();
    this.render();
  }
  render() {
    this.grid.grid.forEach((row, x) => {
      row.forEach((cell, y) => {
        this.term.hideCursor();
        this.term.moveTo((this.startx+x), (this.starty+y), (cell ? this.live : this.dead));
      });
    });
  }
  run(interval) {
    this.render();
    setInterval(() => {
      this.next();
    }, interval);
  }
}

function run() {
  const canvas = new TerminalGrid({x:10, y:10, border:5, center:true, max:false});
  canvas.run(1000);
}

if (typeof module != 'undefined' && !module.parent) {
  run();
}
