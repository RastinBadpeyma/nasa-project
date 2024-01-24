const {getAllLaunches} = require('../../models/launches.model');
// const launchesRouter = require('./launches.router');

function httpGetAllLaunches(req , res){
   return res.status(200).json(Array.from(getAllLaunches()));
}

module.exports = {
   httpGetAllLaunches,
};