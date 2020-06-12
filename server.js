require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 7000;
const { Country, Worldwide } = require("./API/classes");
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
  const lastSearch = req.headers.cookie.split("=")[1];
  const query = formatQueryString(req.query.country) || "UK";

  !query && !lastSearch ? (search = "UK") : (search = query);
  const allData = await Promise.all([
    country(search),
    worldwide(),
    countryNames(),
  ]);

  req.country = new Country(allData[0]);
  req.worldwide = new Worldwide(allData[1]);
  req.countryNames = allData[2].map((i) => [i.country, i.code]).sort();
  next();
}

function formatQueryString(string) {
  if (string.length >= 4) return string.charAt(0).toUpperCase() + string.slice(1);
  return string.toUpperCase();
}

app.listen(PORT, () => console.log(`Listening On Port ${PORT}`));
