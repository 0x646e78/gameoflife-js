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
    this.speed = document.getElementById('speed');
    this.speed.addEventListener('change', () => {
      this.stop();
      this.start();
    });
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('width', w);
    this.canvas.setAttribute('height', h);
    this.canvas.setAttribute('style', 'border: 1px solid #000000');
    document.getElementById('dyncanvas').appendChild(this.canvas);
    this.context = this.canvas.getContext('2d');
    const rect = this.canvas.getBoundingClientRect();
    let drawing = false;
    let x = 0;
    let y = 0;
    this.canvas.addEventListener('mousedown', (e) => {
      this.stop();
      x = Math.floor((e.clientX - rect.left) / 10);
      y = Math.floor((e.clientY - rect.top) / 10);
      this.grid.toggle(x, y);
      this.drawcell(this.grid.get(x, y), x, y);
      this.drawn = ["" + x + y];
      drawing = true;
    });
    this.canvas.addEventListener('mousemove', (e) => {
      if (drawing === true) {
        const mvX = Math.floor((e.clientX - rect.left) / 10);
        const mvY = Math.floor((e.clientY - rect.top) / 10);
        if (!(this.drawn.includes("" + mvX +mvY))) {
          this.grid.toggle(mvX, mvY);
          this.drawcell(this.grid.get(mvX, mvY), mvX, mvY);
          this.drawn.push("" + mvX + mvY);
          console.log(this.drawn);
        }
      }
    });
    this.canvas.addEventListener('mouseup', () => {
      if (!(this.interval) && drawing && !this.manualStop) {
        this.start();
        this.drawn = [];
      }
      drawing = false;
    });
    this.restart = document.getElementById('restartButton');
    this.restart.addEventListener('click', () => {
      this.stop();
      this.grid = newGridFromState(initState, (w / 10), (h / 10));
      this.start();
    });
    this.startstop = document.getElementById('toggleButton');
    this.startstop.addEventListener('click', () => {
      if (this.interval) {
        this.stop();
        this.manualStop = true;
      } else {
        this.start();
        this.manualStop = false;
      }
    });
    this.randomise = document.getElementById('randomButton');
    this.randomise.addEventListener('click', () => {
      this.grid.randomise();
    });
		this.addState = document.getElementById('loadState');
		this.addState.addEventListener('click', () => {
      this.loadState(initState);
    });
    if (this.canvas.getContext) {
      this.grid = this.initStateLoad(initState, w, h);
    } else {
      throw new Error('No canvas available');
    }
  }
	loadState(state) {
		state.forEach((row, x) => {
			row.forEach((cellState, y) => {
				this.grid.set(x, y, cellState);
			});
		});
	}
	initStateRandom(w, h) {
    this.grid = new Grid((w / 10), (h / 10));
    this.grid.randomise();
	}
	initStateLoad(state, w, h) {
    return newGridFromState(state, (w / 10), (h / 10));
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
    }, 1020 - this.speed.value);
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
