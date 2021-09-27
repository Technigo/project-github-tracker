//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇

const config = {
  type: 'doughnut',
  data: {
    labels: ['finished', 'not finished'],
    datasets: [
      {
        label: 'My technigo projects',
        data: [5, 20 - 5],
        backgroundColor: ['rgb(255, 99, 132)', '#e6e6e6'],
        hoverOffset: 4,
      },
    ],
  },
}

const myProjects = new Chart(ctx, config)
