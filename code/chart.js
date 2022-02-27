//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇

const pieData = {
  labels: ['Projects to go', 'Projects done'],
  datasets: [
    {
      label: 'Technigo project progress',
      data: [19, 6],
      backgroundColor: ['RGB(27, 27, 33)', 'RGB(230, 211, 65)'],
      borderColor: '#21262c',
      hoverOffset: 2,
    },
  ],
}

const pieConfig = {
  type: 'bar',
  data: pieData,
}

const pieChart = new Chart(ctx, pieConfig)

const updatePieChart = (chart, newData) => {
  chart.data.datasets.forEach(dataset => {
    dataset.data.pop()
    dataset.data.push(newData)
  })
  chart.update()
}

