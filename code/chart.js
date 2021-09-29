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
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                ],
                hoverOffset: 5
            }]
        }
    }
    const myChart = new Chart(ctx, config)
}




