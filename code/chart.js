//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇
const drawChart = (amount) => {
    console.log("Draw chart with amount: " + amount)
    const data = {
        labels: [
            'Completed',
            'Remaining'
        ],
        datasets: [
            {
                backgroundColor: ['#A8DADC', '#457B9D'],
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



