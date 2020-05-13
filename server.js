require("dotenv").config();
const express = require("express");
const app = express();
const API = require("./API");
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

app.get("/", async (req, res) => {
  const dbEntries = await schema.TotalByCountry.find({})
  const countries = dbEntries.map(i => i.country).sort()
  return res.render(__dirname + "/views/index.ejs", {
    countries: countries
  });
})

app.post("/getData", dbQuery, (req, res) => {
  if (!req.country) return res.status(400).json({errmsg: `${req.body.country} Does Not Exist!`})
  return res.status(200).json({
    countryData: {
      countryData: Object.entries(new countryData(req.country)),
      lat: req.country.lat,
      lng: req.country.lng,
      alpha2code: req.country.alpha2code,
      country: req.country.country
    },
    worldwideData: Object.entries(new countryData(req.totals))
  })
})

app.listen(7000, () => console.log(`Listening on port ${process.env.PORT || 7000}`));

setInterval(() => {
  API.getTotals()
  API.getCountry()
}, 899950)

async function dbQuery(req, res, next) {
  try {
    req.country = await schema.TotalByCountry.findOne({ country: req.body.country })
    req.totals = await schema.TotalWorldwide.findOne({ _id: "worldwide" })
  } catch (error) { return res.status(500).json({ errmsg: error }) }
  next()
}

class countryData {
  constructor(data) {
    this.Confirmed = addCommas(data.confirmed)
    this.ActiveCases = addCommas(data.confirmed - data.recovered - data.deaths)
    this.Critical = addCommas(data.critical)
    this.Deaths = addCommas(data.deaths)
    this.Recovered = addCommas(data.recovered)
    this.LastUpdated = formatDate(data.lastUpdate)
  }
}

class worldwide {
  constructor(data) {
    this.confirmed = addCommas(data.confirmed)
    this.activeCases = addCommas(data.confirmed - (data.recovered - data.deaths))
    this.critical = addCommas(data.critical)
    this.deaths = addCommas(data.deaths)
    this.recovered = addCommas(data.recovered)
    this.lastUpdated = formatDate(data.lastUpdate)
  }
}

function formatDate(date) {
  temp = Date(date);
  const unformattedDate = temp.split(" ");
  return `${unformattedDate[0]}, ${unformattedDate[2]} ${unformattedDate[1]} ${unformattedDate[3]} at ${unformattedDate[4]}`;
}

function addCommas(nStr) {
  nStr += "";
  var x = nStr.split(".");
  var x1 = x[0];
  var x2 = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + "," + "$2");
  }
  return x1 + x2;
}