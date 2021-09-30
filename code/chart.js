//DOM-selector for the canvas 👇
const ctx = document.getElementById('myChart').getContext('2d')

//"Draw" the chart here 👇

const drawChart = (amount) => {

    const config = {
        type: 'doughnut',
        data: {
            labels: [
                'Finished Projects',
                'Projects Left',
            ],
            datasets: [{
                label: ['Finished Projects', 'Projects Left'],
                data: [amount, 20 - amount],
                backgroundColor: [
                    '#BFADA3',
                    '#504746',
                ],
                hoverOffset: 4
            }]
        }
    }
    const myChart = new Chart(ctx, config)
}






