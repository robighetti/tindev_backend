const express = require('express');
const server = express();

const port = 3333;

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});