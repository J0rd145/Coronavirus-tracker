require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 7000;
const validate = require("./API/validation")
const API = require("./API/API");
const { search } = require("./API/validation");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/views"));
app.set("view-engine", "ejs");

app.get("/", getData, (req, res) => {
  return res.render(__dirname + "/views/index.ejs", {
    country: req.data[0],
    countryNames: req.data[1],
  });
});

app.get("/history-for", getHistory, (req, res) => {
  return res.status(200).json({ country: req.chartData })
})

app.get("/latlngfor", getLatLng, (req, res) => {
  return res.status(200).json({ LatLng: req.LatLng })
})

async function getData(req, res, next) {
  const lastSearch = validate.cookie(req.headers.cookie)
  const search = validate.search(req.query.country, lastSearch)
  const data = await API.getData(search)
  req.data = validate.data(data)
  next()
}

async function getHistory(req, res, next) {
  const searchCountry = req.query.country
  const countryData = await API.getData(searchCountry)
  if (!countryData) return res.status(400).json({ errmsg: "No Data Found" })
  const formattedData = validate.chartData(countryData[0])
  req.chartData = formattedData
  next()
}

async function getLatLng(req, res, next) {
  const searchCountry = req.query.country
  const countryData = await API.getData(searchCountry)
  if (!countryData) return res.status(400).json({ errmsg: "No Data Found" })
  const formattedData = validate.latLng(countryData[0])
  req.LatLng = formattedData
  next()
}

app.listen(PORT, () => console.log(`Listening On Port ${PORT}`));
