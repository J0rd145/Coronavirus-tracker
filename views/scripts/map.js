const script = document.createElement("script");
script.src =
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyCZfrsYvmCZ9y1N_DXX0jGHcNzy73g7OBs&callback=initMap";
script.defer = true;
script.async = true;

window.initMap = async function () {
  const data = await getLatLng();
  let [lat, lng, country] = data.LatLng
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: lat, lng: lng },
    zoom: 4,
  });
  const marker = new google.maps.Marker({
    position: { lat: lat, lng: lng},
    map: map,
    title: country
  });
};
document.head.appendChild(script);

async function getLatLng() {
  const country = document.getElementById("country-name").innerText;
  const data = await fetch(
    `/latlngfor?country=${country}`
  ).then((res) => res.json());
  return data;
}
