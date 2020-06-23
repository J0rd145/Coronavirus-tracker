require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 7000;
const { Data, Unknown, ChartData } = require("./API/classes");
const { country, worldwide, countryNames } = require("./API/API");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/views"));
app.set("view-engine", "ejs");

app.get("/", getData, (req, res) => {
  return res.render(__dirname + "/views/index.ejs", {
    country: req.countryData,
    countryNames: req.countryNames,
  });
});

app.get("/history-for", getHistory, (req, res) => {
  return res.status(200).json({ country: req.chartData })
})


app.get("/latlngfor", getLatLng, (req, res) => {
  return res.status(200).json({ LatLng: req.LatLng })
})

async function getLatLng(req, res, next) {
  const searchCountry = req.query.country
  const countryData = await country(searchCountry) 
  if (!countryData) return res.status(400).json({ errmsg: "No Data Found" })
  const formattedData = validateLatLng(countryData)
  req.LatLng = formattedData
  next()
}

async function getData(req, res, next) {
  const lastSearch = validateCookie(req.headers.cookie)
  const search = validateSearch(req.query.country, lastSearch)
  let allData;
  if (search == "Global") {
    allData = await Promise.all([ worldwide(), countryNames() ])
  } else {
    allData = await Promise.all([ country(search), countryNames() ])
  }
  [req.countryData, req.countryNames] = [...validateData(allData)]
  next()
}

async function getHistory(req, res, next) {
  const searchCountry = req.query.country
  searchCountry != "Global" ? countryData = await country(searchCountry) : countryData = await worldwide()
  if (!countryData) return res.status(400).json({ errmsg: "No Data Found" })
  const formattedData = validateChartData(countryData)
  req.chartData = formattedData
  next()
}

function validateSearch(country, lastSearch) {
  if (country) return country
  if (lastSearch) return lastSearch
  return "UK"
}

function validateCookie(cookie) {
  !cookie ? result = null : result = cookie.split("=")[1]
  return result
}

function validateChartData(data) {
  !data ? countryData = new Unknown(data) : countryData = new ChartData(data)
  return countryData 
  }

function validateLatLng(data) {
  if (!data) return [null, null]
  return [data.latitude, data.longitude, data.country]
}

function validateData(data) {
  !data[0] ? countryData = new Unknown(data[0]) : countryData = new Data(data[0])
  !data[1] ? countrynames = undefined : countrynames = data[1].map((i) => [i.country]).sort();
  return [countryData, countrynames]
}

app.listen(PORT, () => console.log(`Listening On Port ${PORT}`));
