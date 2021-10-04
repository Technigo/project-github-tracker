//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇
const config = {
    type: 'doughnut',
    data: {
    labels: [
      'Projects Done',
      'Projects Left',      
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [6, 20-5],
      backgroundColor: [
        '	rgb(255,250,250)',
        'rgb(23, 18, 18)',
        
      ],
      hoverOffset: 4
    }]
    },
  };



const myChart = new Chart(ctx, config)

