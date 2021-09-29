const readCSV = require("./readCSV");
const gatherDBinfo = require("./gatherDBinfo");
const analisys = require("./analisys");
const mongoose = require("./DB/mongodb");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.json("API Started");
  });

  app.get("/readCSV", async (req, res) => {
    //Funcao para importacao dos dados dos arquivos CSV para o MongoDB
    let uploadResponse = await readCSV.readAllData().then();
    if (uploadResponse === true) {
      res.send("CSV read and Database Loaded!");
    } else {
      res.send("Something went wrong");
    }
  });

  app.get("/clearDB", async (req, res) => {
    await mongoose.clearDB();
    res.send("The database is cleared");
  });

  app.get("/users", async (req, res) => {
    let data = await gatherDBinfo.getUserInfo().then();
    res.json(data);
    console.table(data);
  });

  app.get("/analisys", async (req, res) => {
    let data = await analisys.organizeAnalisysJSON().then();
    res.json({ 1: data });
  });
};
