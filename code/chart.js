//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇
progressChart = (projectsLeft) => {
    
    const config = {
        type: 'bar',
        data: {
            datasets: [{
                label: '',
                backgroundColor: ['rgb(97, 192, 194)', 'rgb(186, 223, 215)'],
                borderColor: 'rgb(22, 19, 21)',
                hoverOffset: 8,
                data: [projectsLeft, 19 - projectsLeft]
            }],
            
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                'done 🗸',
                'todo 📝',
            ]
        },

        options: {
            plugins: {
                responsive: true,
                legend: {
                    display: true,
                    position:'chartArea',
                    labels: {
                        color: 'white',
                        fontFamily: 'Roboto',
                        boxWidth: 0,
                        boxHeight: 0,
                    }
                },
                title: {
                    display: true,
                    text: 'BOOT CAMP PROGRESS',
                    position: 'top',
                    color: 'white',
                    fontFamily: 'Roboto',
                    weight: 'bold',
                }
            }
        }
    }
    
    const myChart = new Chart(ctx, config);
}