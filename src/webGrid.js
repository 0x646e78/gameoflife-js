const { Grid } = require('./index');

function run() {
  const canvas = document.getElementById('grid');
  console.log('canvas', canvas);
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

//    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10, 10, 50, 50);

    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(30, 30, 50, 50);
  }
}

const grid = new Grid (5, 5);
grid.next();

window.addEventListener('load', function() {
    run();
}, true);
