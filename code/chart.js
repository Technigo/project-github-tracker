//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇

// console.log('Chart is here') //just checks if Chart.js is on


// needs fixing... went to fast

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
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
          ],
          hoverOffset: 4
        }]
      },
    };

  const myChart = new Chart (ctx, config)
}

