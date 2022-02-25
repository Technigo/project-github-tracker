const ctx = document.getElementById('chart')

const labels = [
  'Projects completed',
  'Projects left',
];

const data = {
  labels: labels,
  datasets: [{
    label: 'My First Dataset',
    data: [6, 13],
    backgroundColor: [
      'rgb(142, 85, 255)',
      'rgb(142, 85, 255, 0.3)',
    ],
    hoverOffset: 4
  }]
};

const configuration = {
  type: 'doughnut',
  data: data,
  options: {}
};

const myChart = new Chart(
  ctx,
  configuration
);
