const ctx = document.getElementById('chart').getContext('2d')
const technigoProjects = 21

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
                        repos,
                        technigoProjects - repos
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