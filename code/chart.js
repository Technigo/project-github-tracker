
//DOM-selector for the canvas
const ctx = document.getElementById('chart').getContext("2d");

//drawing the chart
const drawChart = (projects) => { 
const labels = [
    'Finished projects',
    'Upcoming projects',
];

const data = {
    labels: labels,
    datasets: [{
    data: [projects, 19-projects],
    label: 'Bootcamp progress',
    backgroundColor: ['rgb(255, 99, 132)', 'rgb(104, 131, 180)'],
    }]
};

const config = {
    type: 'doughnut',
    data: data,
    options: {}
};

new Chart(document.getElementById('chart'),config);
}
