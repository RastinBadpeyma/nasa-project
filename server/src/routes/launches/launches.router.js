const express = require('express');

const {
 httpGetAllLaunches, 
 httpAdNewLaunches, 
 
} = require('./launches.controller');
const launchesRouter = express.Router();

// /planets/
launchesRouter.get('/' , httpGetAllLaunches);
launchesRouter.post('/' , httpAdNewLaunches);
module.exports = launchesRouter;