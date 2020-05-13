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