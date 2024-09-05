const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const planetsRoutes = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");

app.use(cors());
// app.use(
//   cors({
//     origin: "*",
//   })
// );
// app.use(morgan("combined"));
app.use(express.json());
app.use("/planets", planetsRoutes);
app.use("/launches", launchesRouter);
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/*", (req, res) => {
  return res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
