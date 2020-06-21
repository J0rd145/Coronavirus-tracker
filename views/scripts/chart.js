function genGraph(data) {
  if(!data) return
  [confirmed, deaths, recovered, critcal] = [...formatData(data.country)]
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Confimed', 'Deaths', 'Recovered', "Critical"],
      datasets: [{
        label: 'Number Of Cases',
        data: [confirmed, deaths, recovered, critcal],
        backgroundColor: [
          '#3480f3',
          '#ee2b2b',
          '#1aa826',
          '#a242f0',
        ],
        borderColor: [
          '#3586ff',
          '#ff2e2e',
          '#35ff46',
          '#ad48ff',
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

function getData() {
  const country = document.getElementById("country-name").innerText
  fetch(`http://localhost:7000/history-for?country=${country}`)
  .then(res => res.json())
  .then(data => data.errmsg ? genGraph() : genGraph(data)) 
}


function formatData(i) {
  graphData = [i.confirmed, i.deaths, i.recovered, i.critical]
  return graphData
}

getData()