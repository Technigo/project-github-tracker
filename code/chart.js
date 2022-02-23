//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇

const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];

const data = {
labels: labels,
datasets: [{
    label: 'My First dataset',
    backgroundColor: ['#FF5722', '#F96D00', '#F0A500', '#CF7500', '#524A4E', '#1A1C20'],
    borderColor: '#F4F4F4',
    data: [10, 5, 2, 20, 30, 45],
}]
};

const config = {
type: 'doughnut',
data: data,
options: {}
};

const myChart = new Chart(ctx, config);