const { Data, Unknown, ChartData } = require("./classes");

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
    !data ? countryData = new Unknown(data) : countryData = new ChartData(data)
    return countryData 
    }
  
  function validateLatLng(data) {
    if (!data) return [null, null]
    return [data.latitude, data.longitude, data.country]
  }
  
  function validateData(data) {
    !data[0] ? countryData = new Unknown(data[0]) : countryData = new Data(data[0])
    !data[1] ? countrynames = undefined : countrynames = data[1].map((i) => [i.country]).sort();
    return [countryData, countrynames]
  }
  
module.exports = {
    search: validateSearch,
    cookie: validateCookie,
    chartData: validateChartData,
    latLng: validateLatLng,
    data: validateData
}