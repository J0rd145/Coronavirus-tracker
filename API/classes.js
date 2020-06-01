class Country {
  constructor(value) {
    this.country = value.country,
    this.confirmed = value.confirmed,
    this.recovered = value.recovered,
    this.critical = value.critical,
    this.deaths = value.deaths,
    this.activeCases = Math.floor(value.confirmed - value.recovered - value.deaths),
    this.lastUpdate = value.lastUpdate,
    this.latitude = value.latitude,
    this.longitude = value.longitude,
    this.code = value.code
  }
  addCommas(numberObject) {
    const entries = Object.values(numberObject);
    const keys = Object.keys(numberObject)  
    const formattedNumbers = entries.map(i => addComma(i))
    const result = keys.reduce((o, k, i) => ({...o, [k]: formattedNumbers[i]}), {})
    result["lastUpdated"] = formatDate(result["lastUpdated"])
    return Object.entries(result)
  }
}

class Worldwide {
  constructor(value) {
    this.confirmed = value.confirmed;
    this.activeCases = value.confirmed - value.recovered - value.deaths;
    this.critical = value.critical;
    this.deaths = value.deaths;
    this.recovered = value.recovered;
    this.lastUpdated = value.lastUpdate;
  }
  format() {
    const entries = Object.values(this);
    const keys = Object.keys(this)  
    const formattedNumbers = entries.map(i => addComma(i))
    const result = keys.reduce((o, k, i) => ({...o, [k]: formattedNumbers[i]}), {})
    result["lastUpdated"] = formatDate(result["lastUpdated"])
    return Object.entries(result)
  }
}

class NumberData {
  constructor(value) {
    this.confirmed = value.confirmed,
    this.recovered = value.recovered,
    this.critical = value.critical,
    this.deaths = value.deaths,
    this.activeCases = value.activeCases
    this.lastUpdated = value.lastUpdate
  }
}

module.exports = {
  Country: Country,
  Worldwide: Worldwide,
  NumberData: NumberData
};

function addComma(nStr) {
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

function formatDate(date) {
  temp = Date(date);
  const unformattedDate = temp.split(" ");
  return `${unformattedDate[0]}, ${unformattedDate[2]} ${unformattedDate[1]} ${unformattedDate[3]} at ${unformattedDate[4]}`;
}