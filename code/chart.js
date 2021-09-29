//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

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
                label: 'My First Dataset',
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