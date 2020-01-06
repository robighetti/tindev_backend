const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = 3333;

const connectedUsers = {};

io.on('connection', socket => {
  const { user } = socket.handshake.query;  

  connectedUsers[user] = socket.id;
});

mongoose.connect(
  'mongodb+srv://robighetti:nodeJSstack@treinamentos-1sdbm.mongodb.net/oministack9?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  )

app.use((req,res,next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});