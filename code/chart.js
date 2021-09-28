//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇



const drawChart = (amount) => {
    const config = {
        type: 'doughnut',
        data: {
            labels: [
              'Finished projects',
              'Projects to go',
            ],
            datasets: [{
              label: 'My First Dataset',
              data: [amount, 19-amount],
              backgroundColor: [
                'rgb(161, 168, 143)',
                'rgb(119, 133, 161)',
              ],
              hoverOffset: 4
            }]
        }
      };

    const chart = new Chart(ctx, config)
}