const express = require('express');
const app = express();

let http = require('http').Server(app);
let io = require('socket.io')(http);
let PORT = 3000;
let HOSTNAME = 'localhost'

app.get('/', (req, res) => {
  res.json({"success": true})
})

io.on('connection', (client) => {
  console.log('Total nodes connected', io.engine.clientsCount);
  client.on('MESSAGE', (data) => {
    io.emit(data.toAddress, {text: data.text, fromAddress: data.fromAddress});
  })

  client.on('disconnect', () => {
    console.log('disconnected');
  });
})

http.listen(PORT, () => {
  console.log(`Server started at: ${ HOSTNAME }:${PORT}`);
});