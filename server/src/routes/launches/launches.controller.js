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

   if (!launch.mission || !launch.rocket || !launch.launchDate
      || launch.destination) {
      return res.status(400).json({
         error : "Missing required launch property",
      });
   } 

   launch.launchDate = new Date(launch.launchDate);
   // isNan check if a value that we pass in is a number or not
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: 'Invalid launch date',
    });
  }


   addNewLaunch(launch);
   return res.status(201).json(launch);
}

module.exports = {
   httpGetAllLaunches,
   httpAdNewLaunches,
};