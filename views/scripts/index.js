// const script = document.createElement('script');
// script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCZfrsYvmCZ9y1N_DXX0jGHcNzy73g7OBs&callback=initMap';
// script.defer = true;
// script.async = true;

// window.initMap = function() {
//   [lat, lng] = [ document.getElementById("lat"), document.getElementById("lng") ]
//   [lat, lng] = [...validateLatLng(lat.innerText, lng.innerText)]
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: lat, lng: lng},
//     zoom: 4
//   });
// };
// document.head.appendChild(script);

window.onload = () => {
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      }
    }
  });
}
  
  function storeSearch(clickCountry) {
    document.cookie = `lastSearch = ${clickCountry}; expires=Sun, 1 Jan 2040 12:00:00 UTC`
}

function search() {
  const search = event.target.value
  if (!search) return 
  const inputfield = document.getElementById("form")
  inputfield.value = search
  storeSearch(search)
  form.submit()
}

// function validateLatLng(lat, lng) {
//   !lat ? lat = 55.3781 : lat = parseFloat(lat)
//   !lng ? lng = 3.4360 : lng = parseFloat(lng)
//   return [lat, lng]
// }