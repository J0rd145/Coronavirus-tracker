const Country = require("../models/country");
const validate = require("./validation");

async function getCountryData(req, res, next) {
  const lastSearch = validate.cookie(req.headers.cookie);
  const search = validate.search(req.query.country, lastSearch);
  const data = await Country.find()
  req.data = validate.data(data, search);
  next();
}

async function getChartData(req, res, next) {
  const searchCountry = req.query.country;
  const countryData = await Country.findOne({ country: searchCountry });
  const formattedData = validate.chartData(countryData);
  req.chartData = formattedData;
  next();
}

async function getLatLng(req, res, next) {
  const searchCountry = req.query.country;
  const countryData = await Country.findOne({ country: searchCountry });
  const formattedData = validate.latLng(countryData);
  req.LatLng = formattedData;
  next();
}

module.exports = {
    getCountry: getCountryData,
    chartData: getChartData,
    latLng: getLatLng
}