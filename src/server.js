const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');
const server = express();
const port = 3333;

mongoose.connect(
  'mongodb+srv://robighetti:tindev2019@tindev-1sdbm.mongodb.net/tindev?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  )

server.use(express.json());
server.use(routes);

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});