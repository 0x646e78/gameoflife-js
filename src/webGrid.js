const { Grid } = require('./index');

function rect(ctx, n, x) {
  console.log('n', n);
  const fillcolor = "#" + ((n + 1) * 20) + "10" + ((n + 1) * 10);
  console.log('fillcolor', fillcolor);
  ctx.fillStyle = fillcolor;
  ctx.fillRect(x, 10, 10, 10);
}

function run() {
  const canvas = document.getElementById('grid');
  console.log('canvas', canvas);
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

    [10, 20, 30, 40].forEach((x, n) => {
      rect(ctx, n, x);
    });
  }
}

const grid = new Grid (5, 5);
grid.next();

window.addEventListener('load', function() {
    run();
}, true);
