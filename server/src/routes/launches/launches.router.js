const express = require('express');

const {
 httpGetAllLaunches, 
 httpAdNewLaunches, 
 httpAbortLaunch,
 
} = require('./launches.controller');
const launchesRouter = express.Router();

// /planets/
launchesRouter.get('/' , httpGetAllLaunches);
launchesRouter.post('/' , httpAdNewLaunches);
launchesRouter.delete('/:id ', httpAbortLaunch );
module.exports = launchesRouter;