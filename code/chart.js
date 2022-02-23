//"Draw" the chart here 👇
const renderChart = ((completedProjects) => {

  const data = {
    labels: ['Projects'],
    datasets: [{
      data: [completedProjects],
      label: 'Completed',
      backgroundColor: 'rgb(63, 103, 126)',
    }, {
      data: [19],
      label: 'Coming',
      backgroundColor: 'rgb(63,203,226)',
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
      }
    }
  };

  new Chart(document.getElementById('chart'), config);
});