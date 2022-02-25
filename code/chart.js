//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇
const drawChart = (amount) => {

    const labels = [
        'Done or ongoing projects',
        'Projects left to do',
    ];

    const data = {
        labels: labels,
        datasets: [{
        label: 'My First dataset',
        backgroundColor: ['rgb(144, 238, 144)', 'rgb(238, 130, 238)'],
        borderColor: ['rgb(144, 238, 144)', 'rgb(238, 130, 238)'],
        data: [amount, 19-amount],
        }]
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {}
    };

    new Chart(
        ctx,
        config
    );
}


