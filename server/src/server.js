const http = require("http");
const app = require("./app");
const { mongoConnect } = require("./services/mongoService");
const cluster = require("cluster");
const os = require("os");
const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await loadPlanetsData();
  console.log("Running server...", os.cpus().length);
  if (cluster.isMaster) {
    // const workersInOS = os.cpus().length;
    // for (let i = 0; i < workersInOS; i++) {
    //   cluster.fork();
    // }
  } else {
    console.log(`Worker process started`);
  }
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}
startServer();
