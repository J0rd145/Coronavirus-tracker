require("dotenv").config();
const express = require("express");
const app = express();
const { Country, Worldwide, NumberData } = require("./API/classes");
const API = require("./API/API");
const db = require("mongoose");
const schema = require("./models/Schemas");

db.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.connection.once("open", () => {
  console.log("Connected To Database");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/views"));
app.set("view-engine", "ejs");

app.get("/", countryNames, (req, res) => {
  return res.render(__dirname + "/views/index.ejs", {
    countries: req.countries
  });
})

app.post("/getData", dbQuery, (req, res) => {
  return res.status(200).json({
    country: {
      countryData: req.country.countryData,
      latitude: req.country.latitude,
      longitude: req.country.longitude,
      code: req.country.code,
      country: req.country.country
    },
    worldwide: req.totals
  })
})

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT || 7000}`));

setInterval(() => {
  API.getTotals()
  API.getCountry()
}, 899950)

async function dbQuery(req, res, next) {
    req.country = await schema.TotalByCountry.findOne({ country: req.body.country })
    req.totals = await schema.TotalWorldwide.findOne()

    if (!req.country) return res.status(400).json({errmsg: `${req.body.country} Does Not Exist!`})
    
    req.country = new Country(req.country)
    req.country.countryData = req.country.addCommas(new NumberData(req.country))
    req.totals = new Worldwide(req.totals).format()
  next()
}

async function countryNames(req, res, next) {
  const dbEntries = await schema.TotalByCountry.find({})
   req.countries = dbEntries.map(i => i.country).sort()
   next()
}