const http     = require('http');
const fs       = require('fs');
const readline = require('readline');
const stream   = require('stream');

function readFile(path) {
  const instream  = fs.createReadStream(path);
  const outstream = new stream();
  const rl        = readline.createInterface(instream, outstream);
  return new Promise((resolve) => {
    let str = '';
    rl.on('line', l => str += `${l}<br>`).on('close', () => resolve(str));
  });
}

const server = http.createServer(async (req, res) => {
  if (req.url == '/log') {
    let result1 = await readFile('../fundListOffshore.log');
    let result2 = await readFile('../fundListOnshore.log');
    let result3 = await readFile('../offShoreByDay.log');
    let result4 = await readFile('../onShoreByDay.log');
    let tp = (key, str) => `<h2>${key}</h2><p>${str}</p>`;
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`<html><head><meta charset="utf-8"></head><body>
      ${tp('fundListOffshore', result1)}
      ${tp('fundListOnshore' , result2)}
      ${tp('offShoreByDay'   , result3)}
      ${tp('onShoreByDay'    , result4)}
    </body></html>`);
    res.end();
  } else {
    res.end('Invalid Request!');
  }
});

server.listen(9527);
