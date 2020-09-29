// Main server entry point

// Module imports, express and socket server instantiating
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

// Global variables
const users = {};
const rooms = {'general': {url: '', status: 0}};

// Serve static from React build directory
app.use(express.static(path.join(__dirname, '..', 'build')));

// Main route, serve index.html from React build directory
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

// API endpoint to get a list of rooms and online users of each room
app.get('/api/v1/room', function (req, res) {
  let results = [];
  Object.keys(rooms).forEach((room) => {
    results.push({name: room, users: getRoomUsers(room).length})
  });
  res.json(results);
});

// Function to update user in global users object
// Arguments are: user socket id, key and value to update
const updateUser = (user, key, value) => {
  if(!Object.keys(users).includes(user)) users[user] = {sync: 0};
  if(key && value) users[user][key] = value;
};

// Function to get list of room users
// Returns an array of objects with user name and sync status
const getRoomUsers = (room) => {
  return Object.keys(users).reduce(function (result, id) {
    if(room === users[id].room)
      result.push({name: users[id].name, sync: users[id].sync});
    return result;
  }, [])
};

// Function that return room object with info
const getRoomInfo = (room) => {
  return rooms[room];
}

// Function to check if an user name is already used in a room
// If username is an empty string then base name would be "Anon"
// Returns the string of the new username that is unique to the room
const checkUsername = (username, room) => {
  if(username === '') username = 'Anon';
  for(;true;){
    let name = username;
    // Check if name already exists in room
    let usernameExists = Object.keys(users).reduce(function (result, id) {
      if(users[id].room === room && users[id].name === name)
        result.push(users[id]);
      return result;
    }, []);
    // Break loop if no results are found
    if(usernameExists.length === 0) break;
    // Add random number if name is found in room
    username += Math.floor(Math.random() * 10);
  }
  return username;
};

// Socket.io events registration on new socket connection
io.on('connection', (socket) => {

  // Callback for "join" event, params are an object with room name and desired username
  socket.on('join', (params) => {
    let { username, room } = params;
    // Create room if not already exists
    if(!Object.keys(rooms).includes(room)) rooms[room] = {url: '', status: 0}
    // Join socket to room and update user with room name
    socket.join(room);
    updateUser(socket.id, 'room', params.room);
    // Get unique username and update user with it
    let checkedUsername = checkUsername(username, room);
    updateUser(socket.id, 'name', checkedUsername);
    // Emit username and room info to connected socket
    socket.emit('username', username);
    socket.emit('room', {users: getRoomUsers(room), room: getRoomInfo(room)});
    // Emit updated users to room
    socket.to(room).emit('room', {users: getRoomUsers(room), room: getRoomInfo(room)});
    // Emit system message to room with joined user name as param
    socket.to(room).emit('message', {type: 'join', extra: checkedUsername, timestamp: Date.now(), from: null})
  });

  // Callback for "users" event, returns room users list
  socket.on('users', () => {
    socket.emit('users', getRoomUsers(users[socket.id].room));
  })

  // Callback for "message" event, emits message to room and to self with a unified timestamp
  socket.on('message', (message) => {
    let result = {
      'text': message,
      'from': users[socket.id].name,
      'timestamp': Date.now(),
    };
    socket.emit('message', result);
    socket.to(users[socket.id].room).emit('message', result);
  })

  // Callback for "disconnect" event
  socket.on('disconnect', () => {
    if(!Object.keys(users).includes(socket.id)) return;
    let room = users[socket.id].room;
    let username = users[socket.id].name;
    // Remove user from users object
    delete users[socket.id];
    // Removes room from rooms object if there are no users left and room is not "general"
    if(room !== 'general' && getRoomUsers(room).length === 0) delete rooms[room];
    if(getRoomUsers(room).length > 0) {
      // Emit new user list to room if there are users left
      io.sockets.in(room).emit('users', getRoomUsers(room));
      // Emit left system message to room if there are users left
      io.sockets.in(room).emit('message', {type: 'left', extra: username, timestamp: Date.now(), from: null})
    }
  })

  // Callback for "typing" event, relays typing event to other users in the room
  socket.on('typing', () => {
    socket.to(users[socket.id].room).emit('typing', users[socket.id].name);
  })

  // Callback for "url" event
  socket.on('url', (url) => {
    let room = users[socket.id].room;
    // Set room info url to received url
    rooms[room].url = url;
    // Reset sync time for each user in the room
    Object.keys(users).forEach((user) => {
      users[user].sync = 0;
    });
    // Emit url event to each user in the room
    socket.emit('url', url);
    socket.to(room).emit('url', url);
    // Emit users event to each user in the room, includes sync time
    socket.emit('users', getRoomUsers(room));
    socket.to(room).emit('users', getRoomUsers(room));
    // Emit system message to other users in the room, includes user name that changed room url
    socket.to(room).emit('message', {type: 'url', extra: users[socket.id].name, timestamp: Date.now(), from: null});
  })

  // Callback for "sync" event
  socket.on('sync', (sync) => {
    let room = users[socket.id].room;
    // Set room sync state if present in message params
    if(sync.state) rooms[room].status = sync.state;
    // Set user sync time if present in message params
    if(sync.time) users[socket.id].sync = sync.time;
    // Get room info and users info
    let result = {users: getRoomUsers(room), room: getRoomInfo(room)}
    // Emit gathered info to all users of the room
    socket.emit('sync', result);
    socket.to(room).emit('sync', result);
  });

  // Callback for "username" event
  socket.on('username', (username) => {
    let room = users[socket.id].room;
    let oldName = users[socket.id].name;
    // Get unique username
    let newName = checkUsername(username)
    // Update user object with new username
    updateUser(socket.id, 'name', newName);
    // Emit new username to user that changed it
    socket.emit('username', username);
    // Emit new user list to other room users
    socket.to(room).emit('room', {users: getRoomUsers(room), room: getRoomInfo(room)});
    // Emit system message to other room users, includes old name and new name
    socket.to(room).emit('message', {type: 'username', extra: [oldName, newName], timestamp: Date.now(), from: null});
  });
});

// Get port from env settings or use 8080 as fallback
const port = process.env.PORT || 8080;
// Run server
http.listen(parseInt(port, 10), () => {
  console.log('Server listening on ' + port);
});
