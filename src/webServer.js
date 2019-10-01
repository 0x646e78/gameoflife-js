const http = require('http');
const fs = require('fs');

const stateFile = '/home/dnx/dev/public/gameoflife-js/resource/glider_initstate.json';

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'Application/json', 'Access-Control-Allow-Origin': 'null'});
  init = fs.readFileSync(stateFile, 'utf8');
  res.end(init);
}).listen(8080);
