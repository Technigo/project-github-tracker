//"Draw" the chart here 👇

const renderChart = ((completedProjects) => {

// //DELETE LATER
// const renderChart = (() => {

  const data = {
    labels: [''],
    datasets: [{
      data: [completedProjects],
      // data: [6],
      label: 'Completed projects',
      backgroundColor: 'rgb(63, 103, 126)',
    }, {
      data: [19],
      label: 'All Technigo projects',
      backgroundColor: 'rgb(63, 203, 226, 0.2)',
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      indexAxis: 'y',
      scales: {
        x: {
          stacked: true
        },
        y: {
          stacked: true
        }
      },
      plugins: {
          legend: {
              display: true,
          }
      }

    }
  };

  new Chart(document.getElementById('chart'), config);
});

//DELETE LATER
// renderChart();