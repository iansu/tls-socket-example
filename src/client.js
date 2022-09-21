import fs from 'fs';
import tls from 'tls';

const hostname = 'localhost';
const port = 8000;
const options = {
  host: hostname,
  port: port,
  key: fs.readFileSync('./certs/client/client.key'),
  cert: fs.readFileSync('./certs/client/client.crt'),
  ca: fs.readFileSync('./certs/ca/ca.crt'),
};

const socket = tls.connect(options);

socket.setEncoding('utf8');

socket.on('secureConnect', () => {
  console.log('secureConnect event');
  console.log(`client authorized: ${socket.authorized}`);
  console.log('');

  setInterval(() => {
    console.log('<-- sending: hello');
    socket.write('hello');
  }, 5000);
});

socket.on('data', (data) => {
  console.log(`--> received: ${data}`);
});

socket.on('end', () => {
  console.log('end event');
});
