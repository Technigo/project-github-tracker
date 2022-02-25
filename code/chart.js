//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

// Creating a function which is invoked in js.file. 
const showChart = (repos) => {
  Chart.defaults.font.size = 18;
  
  const data = {
    labels: ['Completed projects', 'Remaining projects'],
    datasets: [{
      data: [repos, 19-repos],
      backgroundColor: ['rgb(27, 20, 100)', 'rgb(255, 255, 0)'],
      borderWidth: 2,
      borderColor: 'rgb(27, 20, 100)',
      hoverBorderWidth:3,
      hoverBorderColor: 'rgb(27, 20, 100)',
    }]
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      plugins: {  
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            color: 'rgb(27, 20, 100)',
          }
        }  
      }
    }
  };
  
  const myChart = new Chart(ctx, config);
}
