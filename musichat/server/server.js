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

function updateUser(user, key, value){
  if(!Object.keys(users).includes(user)) users[user] = {};
  if(key && value) users[user][key] = value;
}

io.on('connection', (socket) => {
  socket.on('room', (params) => {
    socket.join(params.room);
    updateUser(socket.id, "room", params.room);
    updateUser(socket.id, "username", params.username);
  });

  socket.on('message', (message) => {
    socket.to(users[socket.id].room).emit('message', message);
  })

  socket.on('username', (username) => {
    updateUser(socket.id, "username", username);
  })

  socket.on('disconnect', () => {
    delete users[socket.id];
  })

});


http.listen(process.env.PORT || 8080, () => {
  console.log('listening on ' + process.env.PORT || 8080);
});
