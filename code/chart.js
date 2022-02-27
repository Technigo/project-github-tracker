//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇
const drawChart = (amount) => {
  const configchart = {
    type: 'doughnut',
    data: {
      label: ['Completed', 'Not Completed'],
      datasets: [
        {
          data: [amount, 19 - amount],
          backgroundColor: ['#77E327', '#E33527'],
          hoverOffset: 3,
        },
      ],
    },
  }
  const myProjects = new Chart(ctx, configchart)
}
