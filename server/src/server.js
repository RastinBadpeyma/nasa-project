const http = require('http');

const express = require('express');

// const app = express();
const app = require('./app');

const PORT = 8000;

const Server = http.createServer(app);

Server.listen(PORT , ()=>{
 console.log(`${PORT}}`);
});