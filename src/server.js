import fs from 'fs';
import tls from 'tls';

const port = 8000;
const options = {
  key: fs.readFileSync('./certs/server/server.key'),
  cert: fs.readFileSync('./certs/server/server.crt'),
  ca: fs.readFileSync('./certs/ca/ca.crt'),
  requestCert: true,
};

const server = tls.createServer(options, (socket) => {
  socket.on('data', (data) => {
    console.log(`--> received: ${data}`);
    console.log(`<-- sending: ${data}`);

    socket.write(data);
  });
});

server.on('connection', function () {
  console.log('connection event');
});

server.on('secureConnection', function (connection) {
  console.log('secureConnection event');
  console.log(`client authorized: ${connection.authorized}`);
  console.log();
});

server.listen(port, function () {
  console.log(`server listening on port ${port}...`);
  console.log();
});
