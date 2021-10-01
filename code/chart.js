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
                data: [amount, 19 - amount],
                backgroundColor: [
                    '#AD8A64',
                    '#BF8B85',
                ],
                hoverOffset: 3
            }]
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 12,
                            family: "'Spartan', sans-serif",
                            color: "rgba(26, 26, 24, 0.849)",
                            weight: "bold",
                        }
                    }
                }
            },
        },
    }
    const myChart = new Chart(ctx, config)
}






