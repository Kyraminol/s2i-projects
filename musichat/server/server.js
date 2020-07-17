const express = require('express');
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require('path');


const users = {};
const rooms = {};

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.get('/api/v1/room', function (req, res) {
  let results = [];
  Object.keys(rooms).forEach((room) => {
    results.push({name: room, users: getRoomUsers(room).length})
  });
  res.json(results);
});

app.get('/api/v1/room/:name', function (req, res) {
  console.log(req.params.name);
})

function updateUser(user, key, value){
  if(!Object.keys(users).includes(user)) users[user] = {};
  if(key && value) users[user][key] = value;
}

function getRoomUsers(room){
  return Object.keys(users).reduce(function (result, id) {
    if (room === users[id].room)
      result.push(users[id].name);
    return result;
  }, [])
}

function getRoomInfo(room){
  return rooms[room];
}

io.on('connection', (socket) => {
  socket.on('room', (params) => {
    let { username, room } = params;
    if(!Object.keys(rooms).includes(room)) rooms[room] = {syncTime: 0, syncURL: ''}
    socket.join(room);
    updateUser(socket.id, 'room', params.room);
    if(username === '') username = 'Anon';
    for(;true;){
      let name = username;
      let usernameExists = Object.keys(users).reduce(function (result, id) {
        if(users[id].room === room && users[id].name === name)
          result.push(users[id]);
        return result;
      }, []);
      if(usernameExists.length === 0) break;
      username += Math.floor(Math.random() * 10);
    }
    updateUser(socket.id, 'name', username);
    socket.emit('room', {users: getRoomUsers(room), room: getRoomInfo(room), self: users[socket.id]});
    socket.to(room).emit('room', {users: getRoomUsers(room), room: getRoomInfo(room)});
  });

  socket.on('message', (message) => {
    let result = {
      'text': message,
      'from': users[socket.id].name,
      'timestamp': Date.now(),
    };
    socket.emit('message', result);
    socket.to(users[socket.id].room).emit('message', result);
  })

  socket.on('disconnect', () => {
    if(!Object.keys(users).includes(socket.id)) return;
    let room = users[socket.id].room;
    delete users[socket.id];
    if(getRoomUsers(room).length === 0) delete rooms[room]
    else io.sockets.in(room).emit('room', {users: getRoomUsers(room), room: getRoomInfo(room)})
  })

  socket.on('typing', () => {
    socket.to(users[socket.id].room).emit('typing', users[socket.id].name);
  })

});

const port = process.env.PORT || 8080;
http.listen(port, () => {
  console.log('Server listening on ' + port);
});
