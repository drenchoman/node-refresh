const { createServer } = require('node:http');
const fs = require('node:fs');
const EventEmitter = require('node:events');

const hostname = '127.0.0.1';
const port = 3000;
const content = 'Test';
const eventEmitter = new EventEmitter();

const server = createServer((req, res) => {
  res.statuscode = 200;
  res.setHeader('Content-Type', 'text/plain');

  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//// --- write file --- ////

// fs.writeFile(
//   '/Users/drenchoman/Desktop/test.txt',
//   content,
//   { flag: 'w+' },
//   (err) => {
//     if (err) {
//       console.error(err);
//     }
//     console.log('Text written successfully');
//   }
// );

// read file

// fs.readFile(
//   '/Users/drenchoman/Desktop/test.txt',
//   'utf8',
//   (err, data) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(data);
//   }
// );

eventEmitter.on('start', (number, end) => {
  console.log(`started from ${number} to ${end}`);
});

eventEmitter.emit('start', 52, 85);
