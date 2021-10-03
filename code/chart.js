//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇

console.log ('chart is heart')

Chart.defaults.font.size = 18;

  const drawChart = (amount) => {
    const config = {
      type: 'doughnut',
      data: {
          labels: [
            'Finished Projects',
            'Projects Left'
          ],
          datasets: [{
            label: 'My First Dataset',
            data: [amount, 20-amount], 
            backgroundColor: [
              'rgb(226, 176, 9)',
              'white'
            ],
            hoverOffset: 4
          }]
        },
    };

    const myChart = new Chart(ctx, config)
  }
