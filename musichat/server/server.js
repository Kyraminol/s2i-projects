const express = require('express');
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require('path');


app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.get('/api/v1/room', function (req, res) {
  res.json([{name: "room1", users: 2}, {name: "room2", users: 10}]);
});

app.get('/api/v1/room/:name', function (req, res) {
  console.log(req.params.name);
})

const users = {};

io.on('connection', (socket) => {
  socket.on('room', (room) => {
    console.log(room)
    socket.join(room);
    users[socket.id] = {room: room};
  });

  socket.on('msg', (msg) => {
    socket.to(users[socket.id].room).emit('msg', msg);
  })

});




http.listen(process.env.PORT || 8080, () => {
  console.log('listening on ' + process.env.PORT || 8080);
});
