//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇


// what's not working below is commented out
// global options
// Chart.defaults.global.defaultFontFamily = 'Lato';
// Chart.defaults.global.defaultFontSize = 18;
// Chart.defaults.global.defaultFontColor = 'grey';

const drawProjectsChart = (amount) => {
    new Chart(ctx, {
        type: 'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data: {
            labels: ['Completed', 'To do'],
            datasets: [{
                barPercentage: 1,
        barThickness: 100,
        maxBarThickness: 200,
        minBarLength: 2,
                label: 'Projects',
                data: [
                    amount,
                    19 - amount
                ],
                backgroundColor: [
                    'red',
                    'green'
                ],
                borderWidth: 2,
                borderColor: 'black',
                hoverBorderWidth: 5,
                hoverBorderColor: 'brown'
            }
        ]
        }
        // options: {
            // title: {
            //     display: true,
            //     text: 'Largest Cities in Massachussets',
            //     fontSize:24
            // },
            // legend:{
            //     display:false,
            //     position:'right',
            //     labels:{
            //         fontColor:'black'
            //     }
            // layout: {
            //     padding: {
            //         left: 0,
            //         right: 0,
            //         bottom: 0,
            //         top: 0
            //     }
                // },
                // tooltips:{
                //     enabled:false
            // }
        // }
    })
}

