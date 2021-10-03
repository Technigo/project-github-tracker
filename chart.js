//DOM-selector for the canvas
const ctx = document.getElementById('chart').getContext('2d')

// Chart showing completed projects and how many there is left
const repoChart = (amount) => {
    const config = {
        type: 'bar',
        data: {
            labels: [
                'Projects done',
                'Projects left',
            ],
            datasets: [{
                label: 'Technigo projects',
                data: [amount, 19-amount],
                backgroundColor: [
                    'rgb(63, 185, 79)',
                    '#8B949E',
                ],
                hoverOffset: 4
            }]
        },
    };        
    const repositoryChart = new Chart(ctx, config);
}