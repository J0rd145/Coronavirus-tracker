const script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCZfrsYvmCZ9y1N_DXX0jGHcNzy73g7OBs&callback=initMap';
script.defer = true;
script.async = true;

window.initMap = function() {
  [lat, lng] = [
    document.getElementById("lat").innerText,
    document.getElementById("lng").innerText 
  ]
  !lng ? lng = 75.073 : lng = parseFloat(lng)
  !lat ? lat = 75.073 : lat = parseFloat(lat)
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: lat, lng: lng},
    zoom: 4
  });
};
document.head.appendChild(script);

function storeSearch(formData) {
  const country = formData.get("country")
  document.cookie = `lastSearch = ${country}; expires=Sun, 1 Jan 2040 12:00:00 UTC`
}

function clickSearch(country) {
  const form = document.getElementById("country")
  const inputfield = document.getElementsByName("country")[0]
  country.split(" " + "-")[0] == "No Flag To Display" ? searchValue = country.split(" " + "-")[1] : searchValue = country.split(" " + "-")[0]
  inputfield.value = searchValue
  form.submit()
}