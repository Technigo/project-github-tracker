//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇

const myChart = (numberOfProjects) => {
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Completed', 'To be done'],
      datasets: [{
        label: 'My First dataset',
        backgroundColor: ['#cc5500', '#3a3a3a'],
        borderColor: '#F4F4F4',
        data: [numberOfProjects, 19 - numberOfProjects],
      }]
    }
  })
}