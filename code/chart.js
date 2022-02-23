//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')


// drawing the chart here
const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'Another month',
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 99, 132)'] // array with different bg-colors
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {}
  };

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
