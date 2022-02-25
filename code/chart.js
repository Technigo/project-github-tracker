//DOM-selector for the canvas
const ctx = document.getElementById("chart").getContext("2d");

//General styling of chart
Chart.defaults.font.size = 8;
Chart.defaults.color = "#1E1E24";

//Amount of repos fetched from fetchRepos function in JS file
const drawChart = (amount) => {
  const labels = [
    'Projects done',
    'Projects to do',
  ];

   const data = {
    labels: labels,
    datasets: [{
      label: 'Technigo projects',
      data: [amount, 19-amount],
      backgroundColor: ['#90A955', '#C4B2BC' ],
      borderColor: '#FFF8F0',
    }]
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
        responsive: true,
        maintainAspectRatio: false,
    }
  };

  const myChart = new Chart( 
  document.getElementById('chart'),
  config
  ); 
  }

