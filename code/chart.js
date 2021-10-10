//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//Draws the chart and displays progress in projects finished vs left
const drawChart = (amount) => {
  const config = {
    type: 'doughnut',
    data: {
      labels: ['Finished projects', 'Projects left'],
      datasets: [
        {
          label: 'Technigo projects',
          data: [amount, 19 - amount],
          backgroundColor: ['rgb(161, 112, 218)', 'rgb(122, 71, 180)'],
          hoverOffset: 4,
        },
      ],
    },
  }

  const myChart = new Chart(ctx, config)
}
