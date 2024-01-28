const launches =  new Map();
latestFlightNumber = 100;

/* Map example

const fruits = new Map([
  ["apples", 500],
  ["bananas", 300],
  ["oranges", 200]
]);

fruits.set("apples", 200);

*/

const launch ={
   flightNumber:100,
   mission: 'Kepler Exploration X',
   rocket: 'Explorer IS1',
   launchDate: new Date('December 27,2030'),
   target : 'Kepler-442 b',
   customers : ['ZTM , NASA'],
   upcoming: true,
   success: true,
}

function getAllLaunches(){
   return Array.from(launches.values());
}

launches.set(launch.flightNumber , launch);

function addNewLaunch(launch){
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
}

module.exports = {
   getAllLaunches,
   addNewLaunch,
}