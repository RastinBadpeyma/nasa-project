const express = require('express');

const app = express();

const PORT = 8000;

const Server = http.createServer(app);

Server.listen(PORT , ()=>{
 console.log(`${PORT}}`);
});