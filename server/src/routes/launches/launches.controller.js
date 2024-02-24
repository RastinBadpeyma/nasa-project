const {
   getAllLaunches,
   // addNewLaunch,
   scheduleNewLaunch,
   existsLaunchWithId,
   abortLaunchById,
} = require('../../models/launches.model');
// const launchesRouter = require('./launches.router');



async function httpGetAllLaunches(req , res){
   return res.status(200).json(await getAllLaunches());
}

async function httpAdNewLaunches(req , res){
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


   await scheduleNewLaunch(launch);
   return res.status(201).json(launch);
}

function httpAbortLaunch(req , res){
  const launchId = Number(req.params.id);

  if(!existsLaunchWithId(launchId)) {
   return res.status(404).json({
     error: 'Launch not found',
   });
  }

  const aborted = abortLaunchById(launchId);
  return res.status(200).json(aborted);
}

module.exports = {
   httpGetAllLaunches,
   httpAdNewLaunches,
   httpAbortLaunch,
};