//DOM-selector for the canvas 👇
const ctx = document.getElementById("chart").getContext("2d");



//"Draw" the chart here 👇
const drawChart = (amount) => {
  //font for chart
  Chart.defaults.font.family = 'Syne Mono, monospace';
  Chart.defaults.font.weight = 'bold';
  Chart.defaults.color = '#fff';
  const config = {
    type: "doughnut",
    data: {
      labels: ["Projects done", "All projects"],
      datasets: [
        {
          label: "My Technigo projects",
          data: [amount, 19 - amount],
          backgroundColor: ["rgba(241, 187, 75,0.6)", "rgba(90, 112, 55, 0.1)"],
          trans: 0.6,
          hoverOffset: 4,
        },
      ],
    },
    options: {
      plugins: {
          legend: {
              position: 'bottom',
              labels: {
                  font: {
                      size: 16,
                  },
              }
          },
      }
  }
    
   
}

  
  const projectsChart = new Chart(ctx, config);
};

  
  


