const ctx = document.getElementById('myChart').getContext('2d')


const drawChart = (amount) => {
const labels = [
'Completet projects',
'Projects left'
];

const data = {
  labels: labels,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: ['rgb(105, 137, 175)','rgb(250, 245, 205)'],
    borderColor: 'rgb(238, 226, 185)',
    data: [amount, 19 - amount],
  }]
};

const config = {
  type: 'doughnut',
  data: data,
  options: {}
};

const myChart = new Chart(
  ctx,config)
}
