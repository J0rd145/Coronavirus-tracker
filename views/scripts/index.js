getData = async (country) => {
  if (!country) return;
  fetch("http://localhost:7000/getData", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ country: formatInput(country) })
  })
  .then(res => res.json())
  .then(data =>  data.errmsg ? dispErr(data.errmsg) : formatData(data.country, data.worldwide))
  .catch(e => console.log(e))
};

formatData = (country, totals) => {
  document.title = `COVID-19 - ${country.country}`
  document.getElementById("countryTitle").innerText = `${country.country} Coronavirus Information`;
  flagDisplay(country.code)
  localStorageSet(country.country)
  moveMap(country.latitude, country.longitude)

  const countryTab = Array.from(document.getElementsByClassName("country-data"))
  const worldwideTab = Array.from(document.getElementsByClassName("worldwide-data"))
  countryTab.forEach((i, index) =>  i.innerText = `${country.countryData[index].join(": ")}`)
  worldwideTab.forEach((i, index) => i.innerText = `${totals[index].join(": ")}`)
};

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
  document.getElementById("countryTitle").innerText = err;
  const data = Array.from(document.getElementsByClassName("country-data"))
  data.forEach(i => i.innerText = `${i.innerText.split(":")[0]}: 0`)
  flagDisplay("err")
}


function flagDisplay(code) {
  if (!code || code == "err") return document.getElementById("flag").innerText = "No Flag To Display"
  document.getElementById("flag").innerText = null
  document.getElementById("flag").classList = `flag-icon-${code.toLowerCase()} flag-icon-background`
}

function localStorageSet(country) {
  localStorage.setItem("lastSearch", country);
}

window.onload = () => {
  const lastSearch = localStorage.getItem("lastsearch")
  if (!lastSearch) return getData("UK")
  return getDate(lastSearch)
}
