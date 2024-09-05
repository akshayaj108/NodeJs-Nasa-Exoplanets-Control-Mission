const launches = new Map();

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

launches.set(launchData.flightNumber, launchData);

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      customer: ["ISRO, NASA"],
      flightNumber: latestFlightNumber,
      upcoming: true,
      success: true,
    })
  );
  return launches;
}

function isExistWithLaunchId(launchId) {
  return launches.has(launchId);
}

function abortLaunchById(launchId) {
  const abortedLaunch = launches.get(launchId);
  abortedLaunch.upcoming = false;
  abortedLaunch.success = false;
  return abortedLaunch;
}
module.exports = {
  getAllLaunches,
  addNewLaunch,
  isExistWithLaunchId,
  abortLaunchById,
};
