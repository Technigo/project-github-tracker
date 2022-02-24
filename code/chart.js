// //DOM-selector for the canvas 👇
const ctx = document.getElementById("chart").getContext("2d");
Chart.defaults.font.size = 16;
Chart.defaults.color = "#1E1E24";
//Chart.defaults.font.family = 'Spectral', serif;

const drawChart = (amount) => {
const labels = [
    'Projects done',
    'Projects to be done',
    
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      data: [amount, 19-amount],
      backgroundColor: ['#DCEED1', '#A18276' ],
      borderColor: '#FFF8F0',
    }]
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
        responsive: true,
        // maintainAspectRatio: false,
    }
  };

  const myChart = new Chart( 
  document.getElementById('chart'),
  config
  ); 
 // myChart()   // varför är denna ej aktiverad? vad gör den?
  }

  console.log('test')