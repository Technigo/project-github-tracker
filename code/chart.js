//DOM-selector for the canvas 👇
const chart = document.getElementById('chart').getContext('2d')

Chart.defaults.font.family = 'Roboto'
Chart.defaults.font.size = 23
Chart.defaults.color = 'white'

progressChart = (projectsDone) => {
    
    const config = {
        type: 'doughnut',
        data: {
            datasets: [{
                label: '',
                backgroundColor: ['rgb(198, 228, 207)', 'rgb(111, 167, 132)'],
                borderColor: 'rgb(22, 19, 21)',
                hoverOffset: 8,
                data: [projectsDone, 19 - projectsDone]
            }],
            
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                'done',
                'todo',
            ]
        },

        options: { 
            plugins: {
                responsive: true,
                legend: {
                    display: true,
                    position:'bottom', //change to chartArea if bar chart
                    labels: {
                        fontColor: '#FFF',
                        fontFamily: 'Roboto',
                        boxWidth: 10,
                        boxHeight: 10,
                    }
                },
                title: {
                    display: true,
                    text: 'BOOT CAMP PROGRESS',
                    fontSize: 40,
                    position: 'top',
                    color: '#FFF',
                    fontFamily: 'Roboto',
                    weight: 'bold',
                },
            }
        }
    }

    
    const myChart = new Chart(chart, config);
}