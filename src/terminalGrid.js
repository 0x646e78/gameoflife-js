const { Grid } = require('./index');
const term = require('terminal-kit');

function startX(x, border) {
  return (((term.realTerminal.width - (border * 2) - x) / 2) + border)
}

function startY(y, border) {
  return (((term.realTerminal.height - (border * 2) - y) / 2) + border)
}

function assertIsWholeNumber(n) {
  if (! Number.isInteger(n)) {
    throw new Error("Border should be a whole number")
  }
}

function assertFitsTerm(x, y, border) {
  if (term.realTerminal.width - (border * 2) < x) {
    throw new Error("Edge dimensions are larger than the terminal size");
  }
  if (term.realTerminal.height - (border * 2) < y) {
    throw new Error("Edge dimensions are larger than the terminal size");
  }
}

class TerminalGrid {
  constructor({x=5, y=5, border=1, center=false, max=false}) {
    assertIsWholeNumber(border);
    this.border = border;
    this.live = String.fromCharCode(9617);
    this.dead = " ";
    if (max){
      x = term.realTerminal.width - (border * 2);
      y = term.realTerminal.height - (border * 2);
    }
    assertFitsTerm(x, y, border);
    if (center) {
      this.startx = startX(x, border);
      this.starty = startY(y, border);
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
        this.term.moveTo((this.startx+x), (this.starty+y), (cell ? this.live : this.dead));
        this.term.hideCursor();
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

const canvas = new TerminalGrid({x:30, y:30, border:0, center:true, max:false});
canvas.run(1000);
