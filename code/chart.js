
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
      backgroundColor: ['rgba(239, 191, 126, 255)', 'rgba(232, 183, 162)' ],
      // backgroundColor: ['rgb(131, 28, 147)', 'rgba(19, 115, 199, 0.776)' ],
      borderColor: 'none',
    }]
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
        responsive: true,
        
    }
  };

  const myChart = new Chart( 
  document.getElementById('chart'),
  config
  ); 
 
  }

  console.log('test') 