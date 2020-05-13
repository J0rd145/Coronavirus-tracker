getData = async (country) => {
  if (!country) return;
  country = formatInput(country)
  await postData("http://localhost:7000/getData", country)
  .then(data =>  data.errmsg ? dispErr(data.errmsg) : formatData(data))
  .catch(error => console.log(`Line 6: ${error}`));
};

formatData = (data) => {
  document.title = `COVID-19 - ${data.countryData.country}`
  localStorage.setItem("lastSearch", data.countryData.country);
  if (!data.countryData.alpha2code) {
    document.getElementById("flag").innerText = "No Flag To Display"
  } else {
    document.getElementById("flag").classList = `flag-icon-${data.countryData.alpha2code.toLowerCase()} flag-icon-background`
  }
  moveMap(data.countryData.lat, data.countryData.lng)

  document.getElementById("countryTitle").style.color = "whitesmoke"
  document.getElementById("countryTitle").innerText = `${data.countryData.country} Coronavirus Information`;
  document.getElementById("country-confirmed").innerText = `Confirmed: ${addCommas(data.countryData.confirmed)}`;
  document.getElementById("country-active").innerText = `Active Cases: ${addCommas(data.countryData.confirmed - data.countryData.recovered - data.countryData.deaths)}`
  document.getElementById("country-recovered").innerText = `Recovered: ${addCommas(data.countryData.recovered)}`;
  document.getElementById("country-deaths").innerText = `Deaths: ${addCommas(data.countryData.deaths)}`;
  document.getElementById("country-critical").innerText = `Critical: ${addCommas(data.countryData.critical)}`;
  document.getElementById("country-lastUpdated").innerText = `Last Updated: ${formatDate(data.countryData.lastUpdate)}`;

  document.getElementById("worldwide-confirmed").innerText = `Confirmed: ${addCommas(data.worldwideData.confirmed)}`;
  document.getElementById("worldwide-active").innerText = `Active Cases: ${addCommas(data.worldwideData.confirmed - data.worldwideData.recovered - data.countryData.deaths)}`
  document.getElementById("worldwide-recovered").innerText = `Recovered: ${addCommas(data.worldwideData.recovered)}`;
  document.getElementById("worldwide-deaths").innerText = `Deaths: ${addCommas(data.worldwideData.deaths)}`;
  document.getElementById("worldwide-critical").innerText = `Critical: ${addCommas(data.worldwideData.critical)}`;
  document.getElementById("worldwide-lastUpdated").innerText = `Last Updated: ${formatDate(data.worldwideData.lastUpdate)}`;
};

function formatDate(date) {
  temp = Date(date);
  const unformattedDate = temp.split(" ");
  return `${unformattedDate[0]}, ${unformattedDate[2]} ${unformattedDate[1]} ${unformattedDate[3]} at ${unformattedDate[4]}`;
}

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

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ country: data })
  });
  return response.json();
}

setInterval(() => {
  getData(localStorage.getItem("lastSearch"));
}, 900000);

const script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCZfrsYvmCZ9y1N_DXX0jGHcNzy73g7OBs&callback=initMap';
script.defer = true;
script.async = true;

window.initMap = function() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
};
document.head.appendChild(script);

function moveMap(lat, lng) {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: lat, lng: lng},
    zoom: 4
  });
};

function formatInput(string) {
  if (string.length >= 4) return string.charAt(0).toUpperCase() + string.slice(1);
  return string.toUpperCase()
}

function dispErr(err) {
  document.title = `COVID-19 - ${err}`
  document.getElementById("flag").classList = null
  document.getElementById("countryTitle").innerText = err;
  document.getElementById("countryTitle").style.color = "red";
  document.getElementById("country-confirmed").innerText = `Confirmed: 0`;
  document.getElementById("country-active").innerText = `Active Cases: 0`
  document.getElementById("country-recovered").innerText = `Recovered: 0`;
  document.getElementById("country-deaths").innerText = `Deaths: 0`;
  document.getElementById("country-critical").innerText = `Critical: 0`;
  document.getElementById("country-lastUpdated").innerText = `Last Updated: 0`;
  document.getElementById("flag").innerText = "No Flag To Display"
}

window.onload = () => {
  const lastSearch = localStorage.getItem("lastsearch")
  if (!lastSearch) return getData("UK")
  return getDate(lastSearch)
}
