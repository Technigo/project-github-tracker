//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

console.log('hello from the chart.js')

//"Draw" the chart here 👇


const drawChart = (amount) => {
const config = {
    type: 'doughnut',
    data: {
        labels: [
          'Projects done',
          'Projects left',
          //'Blue'
        ],
        datasets: [{
          label: 'My Projects',
          data: [amount, 19-amount],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 205, 86)',
            //'rgb(54, 162, 235)'
          ],
          hoverOffset: 4
        }]
      },
    };


const repoChart = new Chart(ctx, config);
}


