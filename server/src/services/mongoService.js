const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://nasa-akshay:1234554321@cluster0.kzijy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const LOCAL_MONGO = "mongodb://localhost:27017";

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});
mongoose.connection.on("error", (err) => {
  console.log("Eror - ", err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}
async function mongoDisconnect() {
  await mongoose.disconnect(MONGO_URL);
}
module.exports = {
  mongoConnect,
  mongoDisconnect,
};
