class Data {
  constructor(value) {
    this.country = addCommas(value.country),
    this.confirmed = addCommas(value.confirmed),
    this.recovered = addCommas(value.recovered),
    this.critical = addCommas(value.critical),
    this.deaths = addCommas(value.deaths),
    this.lastUpdate = formatDate(value.lastUpdate),
    this.code = value.code
    this.lat = value.latitude
    this.lng = value.longitude
  }
}
class ChartData {
  constructor(value) {
    this.country = value.country,
    this.confirmed = value.confirmed,
    this.recovered = value.recovered,
    this.critical = value.critical,
    this.deaths = value.deaths
  }
}

module.exports = {
  Data: Data,
  ChartData: ChartData,
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
  return `${unformattedDate[0]}, ${unformattedDate[2]} ${unformattedDate[1]} ${unformattedDate[3]}`;
}