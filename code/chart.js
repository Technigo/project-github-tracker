const ctx = document.getElementById('chart').getContext('2d')

const drawChart = (amount) => {
    const config = {
        type: 'doughnut',
        data: {
            labels: [
              `Pushed projects`,
              `Projects to go`,
            ],
            datasets: [{
              label: 'Technigo progress',
              data: [amount, 20-amount],
              backgroundColor: [
                '#F59B99',
                '#FAECD2'
              ],
              borderColor: [
                'transparent',
                'transparent'
              ],
              hoverOffset: 0
            }]
        },
        options: {
          plugins: {
            legend: {
              position: '',
            }
          }
        }
    }
    const myChart = new Chart(ctx, config)
}

