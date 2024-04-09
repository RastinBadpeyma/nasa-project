const { default: axios } = require('axios');
const launchesDatabase  = require('./launches.mongo');
const planets = require('./planets.mongo');
const launches =  new Map();

const DEFAULT_FLIGHT_NUMBER = 100; 
/* Map example

const fruits = new Map([
  ["apples", 500],
  ["bananas", 300],
  ["oranges", 200]
]);

fruits.set("apples", 200);

*/

const SPACEX_API_URL ='https://api.spacexdata.com/v5/launches/query';

async function populateLaunches() {
   console.log('Downloading launch data...');
   const response = await axios.post(SPACEX_API_URL, {
     query: {},
     options: {
      "pagination" : false,
       populate: [
         {
           path: 'rocket',
           select: {
             name: 1
           }
         },
         {
           path: 'payloads',
           select: {
             'customers': 1
           }
         }
       ]
     }
   });

   if(response.status !==200) {
      console.log('Problem downloading launch date');
      throw new Error('Launch date donwload failed');
   }
   
   const launchDocs = response.data.docs;
   for(const launchDoc of launchDocs)
   {
      const payloads = launchDoc['payloads'];
      const customers = payloads.flatMap((payload) => {
         return payload['customers'];
      });

      
      const launch = {
         flightNumber: launchDoc['flight_number'],
         mission: launchDoc['name'],
         rocket: launchDoc['rocket']['name'],
         launchDate: launchDoc['date_local'],
         upcoming: launchDoc['upcoming'],
         success: launchDoc['success'],
         customers,
       };
   
       console.log(`${launch.flightNumber} ${launch.mission}`);
      await saveLaunch(launch);
   }
}

async function loadLaunchData(){
  const firstLaunch = await findLaunch({
   flighNumber: 1 ,
   rocket: 'Falcon 1',
   mission:'FalconSat',
  });
  if (firstLaunch) {
   console.log('Launch data already loaded!');
  }else{
   await populateLaunches();
  }
}

async function findLaunch(filter){
   return await launchesDatabase.findOne(filter);
}

async function existsLaunchWithId(launchId) {
    return await launchesDatabase.findOne({
     flightNumber: launchId,
    });
}

async function getLatestFlightNumber() {
   const latestLaunch = await launchesDatabase
   .findOne()
   .sort('-flightNumber');

   if (!latestLaunch) {
      return DEFAULT_FLIGHT_NUMBER;
   }

   return latestLaunch.flightNumber;
}

async function getAllLaunches(skip , limit){
   return await launchesDatabase
   .find({} , {'_id' : 0 , '__v': 0})
   .sort({flighNumber: 1})
   .skip(skip)
   .limit(limit);
}
 async function saveLaunch(launch){
   await launchesDatabase.findOneAndUpdate({
    flightNumber : launch.flightNumber,
   },launch , {
      upsert: true,
   });
 }

async function scheduleNewLaunch(launch){
   const planet = await planets.findOne({
      keplerName:launch.targetm,
   });

   if (!planet) {
      throw new Error('No matching planet found');
   }


  const newFlightNumber = await getLatestFlightNumber() + 1;

  const newLaunch = Object.assign(launch, {
    success : true,
    upcoming : true,
    customers : ['Zero to Mastery ','NASA'],
    flightNumber : newFlightNumber,
  });

  await saveLaunch(newLaunch);
}


 //this addNewLaunch function works with our launch as map
/*function addNewLaunch(launch){
   latestFlightNumber++;
   launches.set(
      latestFlightNumber,
      Object.assign(launch,{
         success : true,
         upcoming:true,
         customers:['Zero To Mastery' , 'NASA'],
         flightNumber:latestFlightNumber,

      })
   );
}*/

async function abortLaunchById(launchId){
  const aborted =  await launchesDatabase.updateOne({
      newFlightNumber: launchId,
   }, {
      upcoming: flase,
      success : false,
   });

   return aborted.ok ===1 && aborted.nmodified ===1;
//   const aborted =  launches.get(launchId);
//   aborted.upcoming = false;
//   aborted.success = false;
//   return aborted;


}

module.exports = {
   existsLaunchWithId,
   getAllLaunches,
   scheduleNewLaunch,
   // addNewLaunch,
   loadLaunchData,
   abortLaunchById,
}