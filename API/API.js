require("dotenv").config();
const unirest = require("unirest");

async function fetchWorldwide() {
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
      const additions = { country: "Global", code: "WW", latitude: 0, longitude: 0  }
      const worldwide = { ...additions, ...res.body[0] }
      return resolve(worldwide);
    });
  });
}

async function fetchCountries() {
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
  countries: fetchCountries,
  worldwide: fetchWorldwide
}