//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//Doughnut chart for projects
const drawChart = (amount) => {
  const config = { 
    type: 'doughnut',
    data: {
        labels: [
          'Finished',
          'Not Finished',
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [amount, 20-amount],
          backgroundColor: [
            'rgb(87, 166, 255)',
            'rgb(128, 128, 128)',
          ],
          hoverOffset: 2,
          borderWidth: 0,
        }]
      },
    };
  const myChart = new Chart (ctx, config)
}

