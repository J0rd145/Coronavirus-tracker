const { ChartData } = require("./classes");

function validateSearch(country, lastSearch) {
    if (country) return country
    if (lastSearch) return lastSearch
    return "UK"
  }
  
  function validateCookie(cookie) {
    !cookie ? result = null : result = cookie.split("=")[1]
    return result
  }
  
  function validateChartData(data) {
    console.log(data)
    countryData = new ChartData(data)
    return countryData 
    }
  
  function validateLatLng(data) {
    if (!data) return [null, null]
    return [data.lat, data.lng, data.country]
  }
  
  function validateData(data, countryName) {
    const searchCountry = data.findIndex(i => i.country == countryName)
    const countryData = data[searchCountry]
    const countryNames = data.map((i) => [i.country]).sort();
    return [countryData, countryNames]
  }
  
  function validateDBEntry(data) {
    if (data.country == "Diamond Princess" || data.country == "MS Zaandam") {
      data.code = "AA";
      data.latitude = 0
      data.longitude = 0
    } else if (data.country == "Channel Islands") {
      data.code = "KL";
    } else if (data.country == "Kosovo* (disputed teritory)") {
      data.code = "XK"
      data.country = "Kosovo"
    }
    return data
  }

module.exports = {
    search: validateSearch,
    cookie: validateCookie,
    chartData: validateChartData,
    latLng: validateLatLng,
    data: validateData,
    DBEntry: validateDBEntry
}