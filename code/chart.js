// chart library 


//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')


//"Draw" the chart here 👇
// const data = {
//     labels: [
//       'Red',
//       'Blue',
//       'Yellow'
//     ],
//     datasets: [{
//       label: 'My First Dataset',
//       data: [400, 50, 100],
//       backgroundColor: [
//         'rgb(255, 99, 132)',
//         'rgb(54, 162, 235)',
//         'rgb(255, 205, 86)'
//       ],
//       hoverOffset: 4
//     }]
//   };

// const config = {
//     type: 'doughnut',
//     data: data,
//   };



//   var myChart = new Chart(ctx, config)

  const drawChart = (number) => {
    const config = {
      type: 'doughnut',
      data: {
        labels: ["Projects done", "Still to do"],
        datasets: [
          {
            label: "My first Dataset", 
            data: [number, 20 - number], // divide donut to 2 different parts
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
            ],
            hoverOffset:4,
          },
        ],
      },
    }
    const myChart = new Chart(ctx, config);
  };
