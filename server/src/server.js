const http = require('http');

const express = require('express');

// const app = express();
const app = require('./app');

const PORT = 8000;

const {loadPlanetsData} =  require('./models/planets.mode')

const Server = http.createServer(app);

async function startServer() {

   await loadPlanetsData();
   Server.listen(PORT , ()=>{
      console.log(`${PORT}}`);
     });
}

startServer();
