//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d');

//"Draw" the chart here 👇
const drawChart = (repoCount) =>{
    const config = {
    type: 'pie',
    data: {
        labels: [
            'Remaining',
            'Completed',
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [(19 - repoCount), repoCount],
            backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)'
            ],
            hoverOffset: 4
        }]
        },
        options: {
            responsive:true,
            maintainAspectRatio: false,
        },
    
    };

    const myProgress = new Chart(ctx, config)
}
