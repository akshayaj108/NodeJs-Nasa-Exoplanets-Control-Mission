const {
  getAllLaunches,
  scheduleNewLaunch,
  isExistWithLaunchId,
  abortLaunchById,
} = require("../../models/launches.model");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({ error: "Missing required launch property" });
  }
  //to convert json string date value into javascript object by javascript date object.
  //Date object convert and return number
  launch.launchDate = new Date(launch.launchDate);

  if (isNaN(launch.launchDate)) {
    return res.status(400).json({ error: "Invalid Date" });
  }
  await scheduleNewLaunch(launch);
  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);
  const isExistLaunch = await isExistWithLaunchId(launchId);
  if (!isExistLaunch) {
    return res.status(404).json({ error: "Launch not found" });
  }

  const isAborted = await abortLaunchById(launchId);
  if (!isAborted) {
    res.status(400).json({ error: "Launch not aborted!" });
  }
  res.status(200).json({
    ok: true,
  });
}
module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
