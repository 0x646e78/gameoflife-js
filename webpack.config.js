const path = require('path');

module.exports = {
    entry: {
          webGrid: "./src/webGrid.js",
        },
    output: {
          path: path.resolve(__dirname, 'dist')
        }
};
