const {
   getAllLaunches,
   addNewLaunch,
} = require('../../models/launches.model');
// const launchesRouter = require('./launches.router');

function httpGetAllLaunches(req , res){
   return res.status(200).json(Array.from(getAllLaunches()));
}

function httpAdNewLaunches(req , res){
   const launch = req.body;

   launch.launchDate = new Date(launch.launchDate);


   addNewLaunch(launch);
   return res.status(201).json(launch);
}

module.exports = {
   httpGetAllLaunches,
   httpAdNewLaunches,
};