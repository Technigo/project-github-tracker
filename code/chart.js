//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')
const technigoProjects = 21

//"Draw" the chart here 👇
const drawBarChart = (repos) => {
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                'Projects to do',
                'Finished projects'
            ],
            datasets: [
                {
                    data: [
                        technigoProjects - repos.length,
                        repos.length,
                    ],
                    backgroundColor: [
                        '#d5a7b6',
                        '#5c7fe9'
                    ]
                }
            ]
        },
        options: {
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: 'rgb(0, 0, 0)'
                    }
                }
            },
        },
    })
} 