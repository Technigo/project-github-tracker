//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇

const repoChart = (amount) => {
    const config = {
        type: 'pie',
        data: {
            labels: [
                'Projects done',
                'Projects left',
                //'Blue'
            ],
            datasets: [{
                // label: 'My Projects',
                data: [amount, 19-amount],
                backgroundColor: [
                    'rgb(63, 185, 79)',
                    '#161b22',
                    // 'rgb(88, 166, 255)',
                ],
                hoverOffset: 4
            }]
        },
    };        
    const repositoryChart = new Chart(ctx, config);
}
        

// const repoChart = new Chart(ctx, config);

// const delayed
// new Chart(ctx,) = {
//   type: 'bar',
//   data:  {
//     labels,
//     datasets: [
//         {
//             data,
//             backgroundColor: ['#d5a7b6', '#5c7fe9'],
//         },
//     ],
// },
//   options: {
//     animation: {
//       onComplete: () => {
//         delayed = true;
//       },
//       delay: (context) => {
//         let delay = 0;
//         if (context.type === 'data' && context.mode === 'default' && !delayed) {
//           delay = context.dataIndex * 300 + context.datasetIndex * 100;
//         }
//         return delay;
//       },
//     },
//     scales: {
//       x: {
//         stacked: true,
//       },
//       y: {
//         stacked: true
//       }
//     }
//   }
// }
// } //denna tillhör