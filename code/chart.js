const ctx = document.getElementById('chart').getContext('2d')

const drawChart = (amount) => {
    const config = {
        type: 'doughnut',
        data: {
            labels: [
              'Finished projects',
              'Projects to go'
            ],
            datasets: [{
              label: 'Technigo progress',
              data: [amount, 20-amount],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)'
              ],
              hoverOffset: 4
            }]
        }
    }
    const myChart = new Chart(ctx, config)
}

