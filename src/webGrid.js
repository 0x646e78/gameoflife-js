const { Grid, newGridFromState } = require('./index');

const initState = [
  [ false, false, false, false, false, false ],
  [ false, false, false, true, false, false ],
  [ false, true, false, true, false, false ],
  [ false, false, true, true, false, false ],
  [ false, false, false, false, false, false ],
  [ false, false, false, false, false, false ],
];

class WebGrid {
  constructor() {
    const w = 500;
    const h = 500;
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('width', w);
    this.canvas.setAttribute('height', h);
    this.canvas.setAttribute('style', 'border: 1px solid #000000');
    document.getElementById('dyncanvas').appendChild(this.canvas);
    this.context = this.canvas.getContext('2d');
    const rect = this.canvas.getBoundingClientRect();
    let drawing = false;
    let x = 0;
    let y = 0
    this.canvas.addEventListener('mousedown', (e) => {
      x = Math.floor((e.clientX - rect.left) / 10);
      y = Math.floor((e.clientY - rect.top) / 10);
      console.log(x, y);
      this.grid.toggle(x, y);
      this.drawcell(this.grid.get(x, y), x, y);
      drawing = true;
    });
    this.canvas.addEventListener('mousemove', (e) => {
      if (drawing === true) {
        const mvX = Math.floor((e.clientX - rect.left) / 10);
        const mvY = Math.floor((e.clientY - rect.top) / 10);
        if ((x !== mvX) || (y !== mvY)){
          this.grid.toggle(mvX, mvY);
          this.drawcell(this.grid.get(mvX, mvY), mvX, mvY);
        }
      }
    });
    this.canvas.addEventListener('mouseup', (e) => {
      drawing = false;
    });
    this.startstop = document.getElementById('toggleButton');
    this.startstop.addEventListener('click', () => {
      if (this.interval) {
        this.stop();
      } else {
        this.start();
      }
    });
    if (this.canvas.getContext) {
      this.grid = newGridFromState(initState, (w / 10), (h / 10));
//      this.grid = new Grid(40,40);
//      this.grid.randomise();
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
