//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇
const drawChart = (amount) => {
  const config = {
    type: 'doughnut',
    data: {
      labels: ['Finished', 'Not finished'],
      datasets: [
        {
          label: 'Technigo projects rate ',
          data: [amount, 19 - amount],
          backgroundColor: ['#0f0c29', '#e6e6e6'],
          hoverOffset: 50,
        },
      ],
    },
  }

  const myProjects = new Chart(ctx, config)
}
