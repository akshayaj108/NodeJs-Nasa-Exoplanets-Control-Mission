const launches = new Map();

const launchesModel = require("../models/launches.mongo");
const planetsModel = require("./planets.mongo");

let latestFlightNumber = 100;

const launchData = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customer: ["AJ'Soft", "ISRO", "NASA"],
  upcoming: true,
  success: true,
};

saveLaunch(launchData);

async function getAllLaunches() {
  return await launchesModel.find({}, { _id: 0, __v: 0 });
}
async function saveLaunch(launch) {
  const isExistPlanet = await planetsModel.findOne({
    keplerName: launch.target,
  });

  if (!isExistPlanet) {
    // res.status(400).json({ message: "No matching planet found!" });
    throw new Error("No matching planet found!");
  }
  return await launchesModel.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}
// function addNewLaunch(launch) {
//   latestFlightNumber++;
//   launches.set(
//     latestFlightNumber,
//     Object.assign(launch, {
//       customer: ["ISRO, NASA"],
//       flightNumber: latestFlightNumber,
//       upcoming: true,
//       success: true,
//     })
//   );
//   return launches;
// }
async function getLatestFlightNumber() {
  const DEFAULT_FLIGHT_NUM = 100;
  const latestLaunch = await launchesModel.findOne().sort("-flightNumber");
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUM;
  }
  return latestLaunch.flightNumber;
}
async function isExistWithLaunchId(launchId) {
  return await launchesModel.findOne({
    flightNumber: launchId,
  });
}
async function scheduleNewLaunch(launch) {
  const latestFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["Nasa-ZTM", "AJ"],
    flightNumber: latestFlightNumber,
  });
  await saveLaunch(newLaunch);
}
async function abortLaunchById(launchId) {
  const abortedLaunch = await launchesModel.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );
  console.log("abort result", abortedLaunch);
  return abortedLaunch.acknowledged && abortedLaunch.modifiedCount === 1;
  // $set: {
  //   upcoming: false,
  //   success: false,
  // },
  // const abortedLaunch = launches.get(launchId);
  // abortedLaunch.upcoming = false;
  // abortedLaunch.success = false;
  // return abortedLaunch;
}
module.exports = {
  getAllLaunches,
  scheduleNewLaunch,
  isExistWithLaunchId,
  abortLaunchById,
};
