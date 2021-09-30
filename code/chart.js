//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')
const cty = document.getElementById('chartTwo').getContext('2d')

//"Draw" the chart here 👇

const drawChart = (amount) => {
    const config = {
        type: 'doughnut', //what type of chart it is
        data: {
            labels: [
                'Finished projects',
                'Projects left',
            ],
            datasets: [{
                label: 'Technigo projects',
                data: [amount, 19 - amount],
                backgroundColor: [
                    // 'rgb(255, 99, 132)',
                    '#036d32',
                    'rgb(54, 162, 235)',
                ],
                hoverOffset: 4
            }]
        }
    }
    const myChart = new Chart(ctx, config);
    // to inject it and put it in the browser (important part, needs to be here, where to put it, what to put)
}

const drawChartTwo = (repo) => {

    const labels = repo.map((repo) => repo.name);
    const data = repo.map((repo) => repo.size);

    const config = {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Repositories size (KB)',
                data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    }

    const myChartTwo = new Chart(cty, config)
}
