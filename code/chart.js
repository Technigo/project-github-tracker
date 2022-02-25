//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇



  const data = {
    labels: ['finished','unfinished'],
    datasets: [{
      label: 'My First dataset',
      backgroundColor: [
                         'rgba(255, 99, 132, 0.2)',
                         'rgba(54, 162, 235, 0.2)',
                         ],
                         
      borderColor: 'rgb(255, 99, 132)',
      data: [3, 10],
    }]
  };

  const config = {
    type: 'pie',
  data: data,
  options: {
    responsive: true,
  }
  };





  const myChart = new Chart( ctx, config );










//------- I just couldn't figure out how to reference the variable from script.js, 
//--------as it was a local variable. I've seen people do functions but I don't want to 
//--------mess up my code. So I fetched the info again instead.






// const data = {
   
//     data: {
//         labels: ['Finsihed', 'TBD'],
//         datasets: [{
//             label: 'Project counter',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
                
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
                
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     },
// };

// let finishedProj = 5
// let unfinishedProj = 19 - finishedProj

// const config = {

//     type: 'pie',
//     data: data,
//     options: {
//         responsive: true
//     }
// }

// const myChart = new Chart(ctx, config);