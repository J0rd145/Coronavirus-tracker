require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 7000;
const { Data, Unknown } = require("./API/classes");
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

})

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
  console.log(req.query.country)
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

function validateData(data) {
  !data[0] ? countryData = new Unknown(data[0]) : countryData = new Data(data[0])
  !data[1] ? countrynames = undefined : countrynames = data[1].map((i) => [i.country]).sort();
  return [countryData, countrynames]
}

app.listen(PORT, () => console.log(`Listening On Port ${PORT}`));
