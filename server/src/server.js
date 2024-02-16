const http = require('http');

const mongoose = require('mongoose');
const express = require('express');

// const app = express();
const app = require('./app');

const PORT = 8000;

const MONGO_URL = "mongodb://localhost:27017/nasa"
const {loadPlanetsData} =  require('./models/planets.mode')

const Server = http.createServer(app);

mongoose.connection.once('open' , () =>{
console.log('MongoDB connection ready!');
});

mongoose.connection.on('error' ,(err) => {
 console.error(err);
});

async function startServer() {
    await mongoose.connect(MONGO_URL);
   await loadPlanetsData();
   Server.listen(PORT , ()=>{
      console.log(`${PORT}}`);
     });
 }

startServer();
