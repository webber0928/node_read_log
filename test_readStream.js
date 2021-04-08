const fs       = require('fs');
const readline = require('readline');
const stream   = require('stream');

function readFile(path) {
  const instream  = fs.createReadStream(path);
  const outstream = new stream();
  const rl        = readline.createInterface(instream, outstream);
  return new Promise((resolve) => {
    let str = '';
    rl.on('line', l => str += `${l}\n`).on('close', () => resolve(str));
  });
}

async function work() {
  let result = await readFile('test.txt');
  console.log(result);
}

work();