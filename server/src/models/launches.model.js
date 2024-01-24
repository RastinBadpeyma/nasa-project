const launches =  new Map();


const launch ={
   flightNumber:100,
   mission: 'Kepler Exploration X',
   rocket: 'Explorer IS1',
   launchDate: new Date('December 27,2030'),
   distination : 'Kepler-442 b',
   customers : ['ZTM , NASA'],
   upcoming: true,
   success: true,
}

function getAllLaunches(){
   return Array.from(launches.values());
}

launches.set(launch.flightNumber , launch);
module.exports = {
   getAllLaunches,
}