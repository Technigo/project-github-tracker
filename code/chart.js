//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇
const drawChart = (amount) => {


const config = {
    type: 'doughnut',
    data: {
    labels: [
      'Finished projects',
      'Upcoming projects',
    ],
    
    datasets: [{
      label: 'My projects at Technigo',
      data: [amount, 19-amount],
      backgroundColor: [
        '#f6e271',
        '#f6B915',
      ],
      hoverOffset: 4
    }]
  },
};


const projectsChart = new Chart(ctx, config);
} 


