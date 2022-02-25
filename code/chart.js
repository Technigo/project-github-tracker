
 // //DOM-selector for the canvas 👇
const ctx = document.getElementById("chart").getContext("2d");

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
      backgroundColor: ['rgba(203,108,127,255)', 'rgba(245,243,240)' ],
      borderColor: 'none',
    }]
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
        responsive: true,
        maintainAspectRatio: true,
    }
  };

  const myChart = new Chart( 
  document.getElementById('chart'),
  config
  ); 
 
  }

  console.log('test') 