//"Draw" the chart here 👇

const renderChart = ((completedProjects) => {

// //DELETE LATER
// const renderChart = (() => {

  const data = {
    labels: [''],
    datasets: [{
      data: [completedProjects],
      // data: [6],
      label: 'Completed',
      backgroundColor: 'rgb(63, 103, 126)',
    }, {
      data: [19-completedProjects],
      label: 'Remaining',
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
          stacked: true,
          grid: {
            display: false,
          }
        },
        y: {
          stacked: true,
          grid: {
            display: false,
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: "Technigo Projects",
        },
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