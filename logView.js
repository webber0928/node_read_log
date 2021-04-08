const http = require('http');
const { exec } = require('child_process');

const server = http.createServer((req, res) => {
  if (req.url == '/deploy') {
    const myShellScript = exec('sh webber.sh ');
    myShellScript.stdout.on('data', (data) => {
      console.log(data);
    });
    myShellScript.stderr.on('data', (data) => {
      console.error(data);
    });
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<html><body>System is rebooted.</body></html>');
    res.end();
  } else {
    res.end('Invalid Request!');
  }
});

server.listen(5000);
