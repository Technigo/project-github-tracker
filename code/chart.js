//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇



const drawChart = (amount) => {
    const config = {
        type: 'doughnut',
        data: {
            labels: [
                'Finished projects',
                'Projects left',
            ],
            datasets: [{
                label: 'My First Dataset',
                data: [amount, 20 - amount],
                backgroundColor: [
                    '#a07a99',
                    '#a7c0b8',
                ],


                hoverOffset: 4
            }]
        },
        options: {
            layout: {
                padding: 25 
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 15
                        }
                    }
                }
            }
        }
    };
    const myChart = new Chart(ctx, config);
}
