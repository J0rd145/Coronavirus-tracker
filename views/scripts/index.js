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
  localStorage.setItem("lastSearch", country.country)
  displayCountryName(country.country)
  flagDisplay(country.code)
  moveMap(country.latitude, country.longitude)
  country.countryData.forEach(i =>  displayData(i, document.getElementById("country")))
  totals.forEach(i => displayData(i, document.getElementById("worldwide")))
};

function displayCountryName(countryName) {
  const title = document.createElement("h4")
  title.append(document.createTextNode(`${countryName} Coronavirus Information`))
  document.title = `COVID-19 - ${countryName}`
  title.id = "countryTitle"
  document.getElementById("country").append(title)
}

function displayData(data, tab) {
  tab.id === "country" ? className = "country-data" : className = "worldwide-data"
  const newNode = document.createElement("h4")
  data[0] === "activeCases" ? data[0] = "Active Cases" : null 
  data[0] === "lastUpdated" ? data[0] = "Last Update" : null 
  newNode.append(document.createTextNode(`${upperCase(data[0])}: ${data[1]}`))
  newNode.classList = className
  tab.append(newNode)
}

function moveMap(lat, lng) {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: lat, lng: lng},
    zoom: 4
  });
};

function upperCase(word) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

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

window.onload = () => {
  const lastSearch = localStorage.getItem("lastsearch")
  if (!lastSearch) return getData("UK")
  return getDate(lastSearch)
}
