//DOM-selector for the canvas 👇
const ctx = document.getElementById("chart").getContext("2d")

//"Draw" the chart here 👇

const drawChart = (amount) => {
  const config = {
    type: 'doughnut',
    data: {
      labels: ['Finished projects', 'Projects left'],
      datasets: [
        {
          label: 'My First Dataset',
          data: [amount, 19 - amount],
          backgroundColor: ['#7C7BE9','rgb(189, 109, 176)'],
          hoverOffset: 4,
        },
      ],
    },
    
  }

  const myChart = new Chart(ctx, config)
}  