require("dotenv").config();
const db = require("mongoose");
const unirest = require("unirest");
const { Country, Worldwide } = require("./classes");
const { TotalByCountry, TotalWorldwide } = require("../models/Schemas");

db.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

allCountryData = () => {
  const req = unirest("GET","https://covid-19-data.p.rapidapi.com/country/all");
  req.query({ format: "json" });
  req.headers({
    "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
    "x-rapidapi-key": process.env.API_KEY,
    useQueryString: true,
  });
  req.end((res) => {
    if (res.error) return console.log(`Line 22: ${res.error}`);
    if (!res.body) return console.log("No Response Body Returned.");
    res.body.forEach((i) => saveToDB(i));
  });
};

totalData = () => {
  const req = unirest("GET", "https://covid-19-data.p.rapidapi.com/totals");
  req.query({ format: "json" });
  req.headers({
    "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
    "x-rapidapi-key": process.env.API_KEY,
    useQueryString: true,
  });
  req.end(async (res) => {
    if (res.error) return console.log(`Line 35 ${res.error}`);
    if (!res.body[0]) return console.log("No Results Returned For Worldwide");
    saveToDB(res.body[0]);
  });
};

async function saveToDB(value) {
  try {
    if (value.country) {
      const dbEntry = await TotalByCountry.findOne({ country: value.country });
      if (dbEntry) return await dbEntry.updateOne({country: value.country}, new Country(value));
      newEntry = new TotalByCountry(new Country(value));
      return await newEntry.save();
    } else {
      const totals = await TotalWorldwide.findOne({});
      if (totals) return await totals.updateOne({ _id: totals.id }, new Worldwide(value));
      const newEntry = new TotalWorldwide(new Worldwide(value));
      return await newEntry.save();
    }
  } catch(e) {console.log(`Line 65: ${e}`)}
}

module.exports = {
  getCountry: allCountryData,
  getTotals: totalData,
};
