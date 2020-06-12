require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 7000;
const { Country, Worldwide, Unknown } = require("./API/classes");
const { country, worldwide, countryNames } = require("./API/API");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/views"));
app.set("view-engine", "ejs");

app.get("/", getData, (req, res) => {
  return res.render(__dirname + "/views/index.ejs", {
    country: req.country,
    worldwide: req.worldwide,
    countryNames: req.countryNames,
  });
});

async function getData(req, res, next) {
  const lastSearch = validateCookie(req.headers.cookie)
  const searchCountry = formatQueryString(req.query.country)
  const search = validateSearch(searchCountry, lastSearch)
  const allData = await Promise.all([
    country(search),
    worldwide(),
    countryNames(),
  ]);
  [req.country, req.worldwide, req.countryNames] = [...validateData(allData)] 
  next();
}

function formatQueryString(string) {
  if (!string) return false
  if (string.length >= 4) return string.charAt(0).toUpperCase() + string.slice(1);
  return string.toUpperCase();
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
  !data[0] ? countryData = new Unknown(data[0]) : countryData = new Country(data[0])
  !data[1] ? worldwideData = undefined : worldwideData = new Worldwide(data[1]);
  !data[2] ? countrynames = undefined : countrynames = data[2].map((i) => [i.country, i.code]).sort();
  return [countryData, worldwideData, countrynames]
}

app.listen(PORT, () => console.log(`Listening On Port ${PORT}`));
