const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
          webGrid: "./src/webGrid.js",
        },
    output: {
          path: path.resolve(__dirname, 'dist')
        }
};
