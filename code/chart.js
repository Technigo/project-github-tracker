//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇


const config = {
  type: 'doughnut',
  data: {
    labels: [
      'Finished projects'
    ],
    datasets: [{
      label: 'Future projects',
      data: [6, 20-6],
      backgroundColor: [
        
         '#E73C7EFF',
        'rgba(255, 159, 64)',
      ],
      
      
    }]
  },
};

const myChart = new Chart(ctx, config)

