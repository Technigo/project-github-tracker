//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇
const drawChart = (amount) => {
    const config = {
        type: 'doughnut',
        data: {
        labels: [
          'Completed projects',
          'Projects left to build',
        ],
        datasets: [{
          label: 'My Technigo projects',
          data: [amount, 20-amount],
          backgroundColor: [
            'rgba(192, 253, 196, 0.48)',
            'rgba(255, 159, 209, 0.8)',
          ],
          hoverOffset: 4
        }],
      },
    };

    const projectsChart = new Chart(ctx, config);
}


