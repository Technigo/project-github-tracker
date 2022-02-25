//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇
const drawChart = (amount) => {
    const data = {
        labels: [
            'Completed projects',
            'Remaining project'
        ],
        datasets: [
            {
                backgroundColor: ['green', 'red'],
                data: [amount, 19 - amount],
                hoverOffSet: 4,
            },
        ],
    };

    const config = {
        type: 'doughnut',
        data: data
    };
    const myChart = new Chart(ctx, config);
}



