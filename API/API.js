require("dotenv").config();
const unirest = require("unirest");

async function getData(search) {
  if (search == "Global") {
    return await Promise.all([ worldwide(), countryNames() ])
  } else {
    return await Promise.all([ country(search), countryNames() ])
  }
}

async function worldwide() {
  return new Promise((resolve, reject) => {
    const req = unirest("GET", "https://covid-19-data.p.rapidapi.com/totals");
    req.query({ format: "json" });
    req.headers({
      "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
      "x-rapidapi-key": process.env.API_KEY,
      useQueryString: true,
    });
    req.end(async (res) => {
      if (res.error) return reject(res.error);
      const additions = { country: "Global", code: "ww" }
      const worldwide = { ...additions, ...res.body[0] }
      return resolve(worldwide);
    });
  });
}

async function country(countryName) {
  return new Promise((resolve, reject) => {
    const req = unirest("GET", "https://covid-19-data.p.rapidapi.com/country");
    req.query({ format: "json", name: countryName });
    req.headers({
      "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
      "x-rapidapi-key": process.env.API_KEY,
      useQueryString: true,
    });
    req.end((res) => {
      if (res.error) return reject(res.error);
      if (!res.body) return reject("No Response Body Returned.");
      return resolve(res.body[0]);
    });
  });
}

async function countryNames() {
  return new Promise((resolve, reject) => {
    const req = unirest(
      "GET",
      "https://covid-19-data.p.rapidapi.com/country/all"
    );
    req.query({ format: "json" });
    req.headers({
      "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
      "x-rapidapi-key": process.env.API_KEY,
      useQueryString: true,
    });
    req.end((res) => {
      if (res.error) return reject(res.error);
      return resolve(res.body);
    });
  });
}

module.exports = {
  getData: getData
}