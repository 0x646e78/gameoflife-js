const { Grid } = require('./index');

function drawcell(ctx, state, x, y) {
  console.log('y', y);
  if (state == true) {
    ctx.fillStyle = "#000000";
  } else {
    ctx.fillStyle = "#ffffff";
  }
  console.log('state:', state)
  ctx.fillRect((x * 10), (10 * y), 10, 10);
}


function render(grid, context) {
  grid.grid.forEach((row, x) => {
    row.forEach((cell, y) => {
      drawcell(context, cell, x, y);
    });
  });
}

function run() {
  const canvas = document.getElementById('grid');
  console.log('canvas', canvas);
  if (canvas.getContext) {
    const context = canvas.getContext('2d');
    const grid = new Grid(20, 20);
    grid.randomise();
    render(grid, context);

    /**
    [10, 20, 30, 40].forEach((x, n) => {
      // n starts at 0, increments 1
      drawcell(context, grid.get(1,1), x, n);
    });
    **/
  }
}


window.addEventListener('load', function() {
    run();
}, true);
