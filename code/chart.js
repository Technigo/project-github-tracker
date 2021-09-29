//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')
const ctx2 = document.getElementById('chart2').getContext('2d')

//"Draw" the chart here 👇
const drawChart = (amount) => {
  const config = {
    type: 'doughnut',
    data: {
      labels: ['finished', 'not finished'],
      datasets: [
        {
          label: 'My technigo projects',
          data: [amount, 19 - amount],
          backgroundColor: ['rgb(255, 99, 132)', '#e6e6e6'],
          hoverOffset: 4,
        },
      ],
    },
  }

  const myProjects = new Chart(ctx, config)
}

// const drawTimeLine = (created) => {
//   const config = {
//     type: 'pie',
//     data: {
//       labels: ['Javascript', 'HTML', 'CSS', 'REACT'],
//       datasets: [
//         {
//           label: 'Created projects',
//           data: [created],
//           backgroundColor: ['#444444', '#e6e6e6'],
//           hoverOffset: 100,
//         },
//       ],
//     },
//   }

//   const line = new Chart(ctx2, config)
// }
