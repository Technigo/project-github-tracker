const ctx = document.getElementById('myChart').getContext('2d')


const drawChart = (amount) => {
const labels = [
'Completet projects',
'Projects left'
];

const data = {
  labels: labels,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: ['rgb(105, 137, 175)','rgb(250, 245, 205)'],
    borderColor: 'rgb(238, 226, 185)',
    data: [amount, 19 - amount],
  }]
};

const config = {
  type: 'doughnut',
  data: data,
  options: {}
};


const myChart = new Chart(
  ctx,config)
}

// //DOM-selector for the canvas 👇
// const ctx = document.getElementById('chart').getContext('2d')

// //"Draw" the chart here 👇
// //https://www.chartjs.org/docs/latest/getting-started/

//   const drawChart = (amount) => {

//     const labels = [
//       'Finished projects',
//       'Projects left',
//     ]
    
//   const data = {
//     labels: labels,
//     datasets: [{
//       label: 'My First dataset',
//       backgroundColor: ['rgb(255, 99, 132)', 'rgb(90, 50, 132)'],
//       borderColor: 'rgb(255, 99, 132)',
//       data: [amount, 19 - amount],
//     }]
//   }


// }
//   const config = {
//     type: 'doughnut',
//     data: data,
//     options: options
    
//   }

//   const myChart = new Chart(ctx,config)
