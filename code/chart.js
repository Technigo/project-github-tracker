//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇
progressChart = (projectsLeft) => {
    
    const config = {
        type: 'pie',
        data: {
            datasets: [{
                label: 'Technigo Project Progress Chart',
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

        //overrides[type].plugins.legend,
        // overrides: {
        //    pie: {
        //         plugins: {
        //             legend: {
        //                 display: true,
        //                 position:'bottom',
        //                 labels: {
        //                     color: 'white',
        //                     fontFamily: 'Roboto',
        //                 }
        //             }
        //         }
        //    },
        // },
        options: {
            plugins: {
                responsive: true,
                legend: {
                    display: true,
                    position:'bottom',
                    labels: {
                        color: 'white',
                        fontFamily: 'Roboto',
                        boxWidth: 25,
                        boxHeight: 25,
                        usePointStyle: true,
                    }
                },
                title: {
                    display: true,
                    text: 'Boot camp progress',
                    color: 'white',
                    fontFamily: 'Roboto',
                    weight: 'bold',
                }
            }
        }
    }
    
    const myChart = new Chart(ctx, config);
}