require("dotenv").config();
const unirest = require("unirest")
const db = require("mongoose");
const schema = require("./models/Schemas");

db.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

allCountryData = () => {
  const req = unirest("GET", "https://covid-19-data.p.rapidapi.com/country/all");
  req.query({
    "format": "json"
  });
  req.headers({
    "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
    "x-rapidapi-key": process.env.API_KEY,
    "useQueryString": true
  });
  req.end((res) => {
    if (res.error) return console.log(`Line 22: ${res.error}`)
    if (!res.body) return console.log("No Response Body Returned.")
    const data = res.body;
    data.forEach(async i => {
      dbEntry = await schema.TotalByCountry.findOne({ country: i.country });
      if (dbEntry) {
        try {
          dbEntry.overwrite({
            country: i.country,
            confirmed: i.confirmed,
            recovered: i.recovered,
            critical: i.critical,
            deaths: i.deaths,
            lastUpdate: i.lastUpdate,
            lat: i.latitude,
            lng: i.longitude,
            alpha2code: i.code,
          });
          return await dbEntry.save()
        } catch (error) { return console.log(`Line 38: ${error} From ${i.country}`); }
      } else {
        try {
          newEntry = new schema.TotalByCountry({
            country: i.country,
            confirmed: i.confirmed,
            recovered: i.recovered,
            critical: i.critical,
            deaths: i.deaths,
            lastUpdate: i.lastUpdate,
            lat: i.latitude,
            lng: i.longitude,
            alpha2code: i.code,
          });
          return await newEntry.save();
        } catch (error) { return console.log(`Line 50: ${error} - From ${i.country}`); }
      }
    });
  })
};

totalData = async () => {
  const req = unirest("GET", "https://covid-19-data.p.rapidapi.com/totals");
  req.query({ format: "json" });
  req.headers({
    "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
    "x-rapidapi-key": process.env.API_KEY,
    "useQueryString": true
  });
  req.end(async (res) => {
    if (res.error) return console.log(`Line 63 ${res.error}`);
    if (!res.body[0]) return console.log('No Results Returned For Worldwide')
    const data = res.body[0];
    try {
    totals = await schema.TotalWorldwide.updateOne({ _id: "worldwide" }, { $set: {
      _id: "worldwide",
      confirmed: data.confirmed,
      recovered: data.recovered,
      critical: data.critical,
      deaths: data.deaths,
      lastUpdate: data.lastUpdate,
    }});
      return;
    } catch (error) { return console.log(`Line 77: ${error}`) }
  });
};

module.exports = {
  getCountry: allCountryData,
  getTotals: totalData,
};
