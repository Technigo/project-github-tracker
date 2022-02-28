//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')
const technigoProjects = 22

//"Draw" the chart here 👇

const drawBarChart = (repos) => {
    new Chart(ctx, {
        type: 'doughnut',
        data: { labels: ['Projects to do', 'Finished projects'],
        datasets: [ { data: [ technigoProjects - repos.length, repos.length,],
        backgroundColor: ['#747474','#ffbb00']}]
        },
        display: true,
        labels: {
        color: 'rgb(0, 0, 0)'
        }
    })
} 