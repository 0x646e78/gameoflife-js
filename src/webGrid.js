const { Grid } = require('./index');

class WebGrid {
  constructor() {
    this.canvas = document.getElementById('grid');
    this.context = this.canvas.getContext('2d');
    if (this.canvas.getContext) {
      this.grid = new Grid(20, 20);
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
    console.log('state:', state)
    ctx.fillRect((x * size), (size * y), size, size);
  }
  render() {
    this.grid.grid.forEach((row, x) => {
      row.forEach((cell, y) => {
        this.drawcell(cell, x, y);
      });
    });
  }
  run() {
    this.grid.randomise();
    setInterval(() => {
      this.render();
      this.grid.next();
    }, 1000);
  }
}

window.addEventListener('load', function() {
    wg = new WebGrid();
    wg.run();
}, true);
