getData = async (country) => {
  if (!country) return;
  country = formatInput(country)
  fetch("http://localhost:7000/getData", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ country: country })
  })
  .then(res => res.json())
  .then(data =>  data.errmsg ? dispErr(data.errmsg) : formatData(data.countryData, data.worldwideData))
  .catch(error => console.error(`Line 6: ${error}`));
};

formatData = (country, totals) => {
  document.title = `COVID-19 - ${country.country}`
  localStorage.setItem("lastSearch", country.countryData.country);
  moveMap(country.lat, country.lng)
  document.getElementById("flag").innerText = null
  document.getElementById("flag").classList = `flag-icon-${country.alpha2code.toLowerCase()} flag-icon-background`
  if (!country.alpha2code) document.getElementById("flag").innerText = "No Flag To Display"
  document.getElementById("countryTitle").style.color = "whitesmoke"
  const countryData = Array.from(document.getElementsByClassName("country-data"))
  const worldwideData = Array.from(document.getElementsByClassName("worldwide-data"))
  document.getElementById("countryTitle").innerText = `${country.country} Coronavirus Information`;
  countryData.forEach((i, index) => i.innerText = `${country.countryData[index][0].toString()}: ${country.countryData[index][1].toString()}`)
  worldwideData.forEach((i, index) => i.innerText = `${totals[index][0].toString()}: ${totals[index][1].toString()}`)
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
  document.getElementById("countryTitle").style.color = "red";
  const data = Array.from(document.getElementsByClassName("country-data"))
  data.forEach(i => i.innerText = `${i.innerText.split(":")[0]}: 0`)
  document.getElementById("flag").classList = null
  document.getElementById("flag").innerText = "No Flag To Display"
}

window.onload = () => {
  const lastSearch = localStorage.getItem("lastsearch")
  if (!lastSearch) return getData("UK")
  return getDate(lastSearch)
}
