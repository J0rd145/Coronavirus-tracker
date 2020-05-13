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
    countryData: req.country,
    worldwideData: req.totals
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