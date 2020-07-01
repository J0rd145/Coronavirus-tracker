require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const DB = require("mongoose")
const { getCountry, chartData, latLng } = require("./API/database")
const updateDB = require("./API/updateDB")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/views"));
app.set("view-engine", "ejs");

DB.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected To DB"))

app.get("/", getCountry, (req, res) => {
  return res.render(__dirname + "/views/index.ejs", {
    country: req.data[0],
    countryNames: req.data[1],
  });
});

app.get("/history-for", chartData, (req, res) => {
  return res.status(200).json({ country: req.chartData })
})

app.get("/latlngfor", latLng, (req, res) => {
  return res.status(200).json({ LatLng: req.LatLng })
})

updateDB()

setTimeout(() => {
  updateDB()
}, 900000)

app.listen(PORT, () => console.log(`Listening On Port ${PORT}`));
