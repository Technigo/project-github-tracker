//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇



const drawChart = (numberRepos) => {
  const config = {
    type: 'bar',
    data: {
      labels: [
        'Finished projects',
        'Projects left',
      ],
      datasets: [{
        label: 'Technigo Projects fall 21',
        data: [numberRepos, 19-numberRepos],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)'
        ],
        hoverOffset: 4
      }]
    },
  }

  const myChart = new Chart(
    ctx,
    config
  )   
}
