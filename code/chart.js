//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇

const drawChart = (amount)=> {
const config = {
  type: 'bar',
  data: {
    labels: [
      'Projects left',
      'Finished projects',
      'Projects total',
    ],
    datasets: [{
      label: 'Bootcamp projects',
      data: [amount, 19-amount, 19],
      barPercentage: 100,
      barThickness: 60,
      maxBarThickness: 100,
      borderRadius: 4,
      // minBarLength: 10,
      backgroundColor: [
        'rgba(255, 99, 132)',
        'rgba(60, 179, 113)',
        'rgba(255, 159, 64)',
      ],
      
      hoverOffset: 4
    }]
  },
}
const theChart = new Chart (ctx, config)
}
