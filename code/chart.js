//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇
const drawChart = (amount) => {
  const config = {
    type: 'doughnut',
    data: {
      labels: ['finished', 'not finished'],
      datasets: [
        {
          label: 'My technigo projects',
          data: [amount, 19 - amount],
          backgroundColor: ['rgb(255, 99, 132)', '#e6e6e6'],
          hoverOffset: 4,
        },
      ],
    },
  }

  const myProjects = new Chart(ctx, config)
}
