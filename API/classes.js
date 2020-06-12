class Country {
  constructor(value) {
    this.country = addCommas(value.country) || null,
    this.confirmed = addCommas(value.confirmed) || null,
    this.recovered = addCommas(value.recovered) || null,
    this.critical = addCommas(value.critical) || null,
    this.deaths = addCommas(value.deaths) || null,
    this.activeCases = addCommas(Math.floor(value.confirmed - value.deaths)) || null,
    this.lastUpdate = formatDate(value.lastUpdate) || null,
    this.latitude = value.latitude || null,
    this.longitude = value.longitude || null,
    this.code = value.code || null
  }
}

class Worldwide {
  constructor(value) {
    this.confirmed = addCommas(value.confirmed) || null;
    this.activeCases = addCommas(Math.floor(value.confirmed - value.deaths)) || null,
    this.critical = addCommas(value.critical) || null;
    this.deaths = addCommas(value.deaths) || null;
    this.recovered = addCommas(value.recovered) || null;
    this.lastUpdate = formatDate(value.lastUpdate) || null;
  }
}

module.exports = {
  Country: Country,
  Worldwide: Worldwide,
};

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

function formatDate(date) {
  temp = Date(date);
  const unformattedDate = temp.split(" ");
  return `${unformattedDate[0]}, ${unformattedDate[2]} ${unformattedDate[1]} ${unformattedDate[3]} at ${unformattedDate[4]}`;
}