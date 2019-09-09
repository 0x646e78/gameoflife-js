const { Grid } = require('./index');

class WebGrid {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('width', 500);
    this.canvas.setAttribute('height', 500);
    document.getElementById('dyncanvas').appendChild(this.canvas);
    //this.canvas = document.getElementById('grid');
    this.context = this.canvas.getContext('2d');
    this.toggle = document.getElementById('toggleButton');
    this.toggle.addEventListener('click', () => {
      if (this.interval) {
        this.stop();
      } else {
        this.start();
      }
    });
    if (this.canvas.getContext) {
      this.grid = new Grid(50,50);
      this.grid.randomise();
    } else {
      throw new Error('No canvas available');
    }
  }
  drawcell(state, x, y) {
    const size = 10;
    const ctx = this.context;
    if (state == true) {
      ctx.fillStyle = "#000000";
    } else {
      ctx.fillStyle = "#ffffff";
    }
    console.log('state:', state);
    ctx.fillRect((x * size), (size * y), size, size);
  }
  render() {
    this.grid.grid.forEach((row, x) => {
      row.forEach((cell, y) => {
        this.drawcell(cell, x, y);
      });
    });
  }
  start() {
    this.interval = setInterval(() => {
      this.render();
      this.grid.next();
    }, 1000);
  }
  stop() {
    clearInterval(this.interval);
    this.interval = null;
  }
}

window.addEventListener('load', function() {
    const wg = new WebGrid();
    wg.start();
}, true);
