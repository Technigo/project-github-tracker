//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

Chart.defaults.font.family = 'Roboto'
Chart.defaults.font.size = 23
Chart.defaults.color = 'white'

//"Draw" the chart here 👇
progressChart = (projectsDone) => {
    
    const config = {
        type: 'doughnut',
        data: {
            datasets: [{
                label: '',
                backgroundColor: ['rgb(214, 169, 195)', 'rgb(188, 96, 153)'],
                borderColor: 'rgb(22, 19, 21)',
                hoverOffset: 8,
                data: [projectsDone, 19 - projectsDone]
            }],
            
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                'done 🗸',
                'todo 📝',
            ]
        },

        options: { 
            // scales: {
            //     x: {
            //         ticks: {
            //             font: {
            //                 size: 18,
            //             }
            //         }
            //     },
            //     y: {
            //         ticks: {
            //             font: {
            //                 size: 18,
            //             }
            //         }
            //     }
            // },
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


    // const config = {
    //     type: 'bar',
    //     data: {
    //         datasets: [{
    //             label: '',
    //             backgroundColor: ['rgb(97, 192, 194)', 'rgb(186, 223, 215)'],
    //             data: [projectsLeft, 19 - projectsLeft],
    //             barPercentage: 1.0,
    //         }],
            
    //         // These labels appear in the legend and in the tooltips when hovering different arcs
    //         labels: [
    //             'done 🗸',
    //             'todo 📝',
    //         ]
    //     },

    //     options: {
    //         scales: {
    //             xAxes: [{
    //                 stacked: true
    //             }],
    //             yAxes: [{
    //                 stacked: true
    //             }]
    //         }
    //     }
    // }
    
    const myChart = new Chart(ctx, config);
}