const express = require('express');
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require('path');


const users = {};
const rooms = {"general": {url: '', status: 0}};

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
  if(!Object.keys(users).includes(user)) users[user] = {sync: 0};
  if(key && value) users[user][key] = value;
}

function getRoomUsers(room, self){
  return Object.keys(users).reduce(function (result, id) {
    if(room === users[id].room && !(self && id === self))
      result.push({name: users[id].name, sync: users[id].sync});
    return result;
  }, [])
}

function getRoomInfo(room){
  return rooms[room];
}

const checkUsername = (username, room) => {
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
  return username;
};

io.on('connection', (socket) => {
  socket.on('join', (params) => {
    let { username, room } = params;
    if(!Object.keys(rooms).includes(room)) rooms[room] = {url: '', status: 0}
    socket.join(room);
    updateUser(socket.id, 'room', params.room);
    updateUser(socket.id, 'name', checkUsername(username, room));
    socket.emit('username', username);
    socket.emit('room', {users: getRoomUsers(room, socket.id), room: getRoomInfo(room)});
    socket.to(room).emit('room', {users: getRoomUsers(room), room: getRoomInfo(room)});
  });

  socket.on('users', () => {
    socket.emit('users', getRoomUsers(users[socket.id].room));
  })

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
    if(room !== "general" && getRoomUsers(room).length === 0) delete rooms[room]
    else io.sockets.in(room).emit('users', getRoomUsers(room))
  })

  socket.on('typing', () => {
    socket.to(users[socket.id].room).emit('typing', users[socket.id].name);
  })

  socket.on('url', (url) => {
    let room = users[socket.id].room;
    rooms[room].url = url;
    Object.keys(users).forEach((user) => {
      users[user].sync = 0;
    });
    socket.emit('url', url);
    socket.to(room).emit('url', url);
    socket.emit('users', getRoomUsers(room));
    socket.to(room).emit('users', getRoomUsers(room));
  })

  socket.on('sync', (sync) => {
    let room = users[socket.id].room;
    if(sync.state) rooms[room].status = sync.state;
    if(sync.time) users[socket.id].sync = sync.time;
    let result = {users: getRoomUsers(room), room: getRoomInfo(room)};
    socket.emit('sync', result);
    socket.to(room).emit('sync', result);
  });

  socket.on('username', (username) => {
    let room = users[socket.id].room;
    updateUser(socket.id, 'name', checkUsername(username));
    socket.emit('username', username);
    socket.to(room).emit('room', {users: getRoomUsers(room), room: getRoomInfo(room)});
  });
});

const port = process.env.PORT || 8080;
http.listen(port, () => {
  console.log('Server listening on ' + port);
});
