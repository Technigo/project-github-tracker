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
            '#333',
            '#fff'
            ],
            hoverOffset: 4
        }]
        },
        options: {
            responsive:true,
            maintainAspectRatio: false,
        },
    
    };

     new Chart(ctx, config)
}
