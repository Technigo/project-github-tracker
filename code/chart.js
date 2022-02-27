//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d') // don't really get what this does

const renderChart = (completedProjects) => {

    const labels = [
        'Projects done',
        'Projects left to do'
      ];
    
      const data = {
        labels: labels,
        datasets: [{
          label: 'My First dataset',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [0, 10, 5, 2, 20, 30, 45],
        }]
      };
    
      const config = {
        type: 'bar',
        data: data,
        options: {}
      };

//     const labels = [
//         'Projects done',
//         'Projects left to do'
//     ]

//     const data = {
//     datasets: [{
//       data: [completedProjects, 19-completedProjects],
//       label: 'completed',
//         backgroundColor: 'rgb(63, 103, 126)',
//         borderColor: 'rgb(255, 99, 132)',
//     }, {
//         data: [19-completedProjects],
//         label: 'remaining',
//         backgroundColor: 'rgb(251, 139, 55)',
//     }]
//   }

//   const config = {
//     type: 'bar',
//     data: data,
//     options: {
//     indexAxis: 'y',
//         scales: {
//         x: {
//         stacked: true,
//         grid: {
//         display: true,
//         },
//         },
//         y: {
//         stacked: true,
//         grid: {
//         display: true,
//         }
//         }
//     },
    
//     plugins: {
//     title: {
//         display: true,
//         text: `Technigo projects completed: ${completedProjects} of 19`,
//         position: 'top',
//         },
//         legend: {
//         display: false,
//         position: 'top',
//         }
//     }
//   }
// }
    new Chart(
    document.getElementById('chart'),
    config
)}

