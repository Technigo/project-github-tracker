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
          'rgb(122, 183, 147, 0.6)',
          'rgb(15, 92, 46, 0.6)'
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
