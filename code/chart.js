//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇




//   const data = {
//     labels: labels,
//     datasets: [{
//       label: 'My First dataset',
//       backgroundColor: 'rgb(255, 99, 132)',
//       borderColor: 'rgb(255, 99, 132)',
//       data: [0, 10, 5, 2, 20, 30, 45],
//     }]
//   };

progressChart = (projectsLeft) => {
    
    const config = {
        type: 'pie',
        data: {
            datasets: [{
                label: 'Technigo Project Progress Chart',
                backgroundColor: ['rgb(97, 192, 194)', 'rgb(186, 223, 215)'],
                borderColor: 'rgb(22, 19, 21)',
                hoverOffset: 6,
                data: [projectsLeft, 19 - projectsLeft]
            }],
            
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                'finished projects',
                'projects to do',
            ]
        },
        options: {}
    }
    
    const myChart = new Chart(ctx, config);
}