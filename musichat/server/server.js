const express = require('express');
const path = require('path');


const app = express();

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

app.listen(process.env.PORT || 8080);
