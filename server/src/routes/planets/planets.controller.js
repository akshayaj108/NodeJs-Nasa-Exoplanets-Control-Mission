const { getAllPlanets } = require("../../models/planets.model");

async function httpGetAllPlanets(req, res) {
  //status code is optional by Default express return status code
  return res.status(200).json(await getAllPlanets());
}
module.exports = { httpGetAllPlanets };
