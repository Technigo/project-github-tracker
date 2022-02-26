//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')


//"Draw" the chart here 👇
const activateChart = (projects) => {
console.log(projects)
const labels = [
  'Completed projects',
  'Total projects',
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'Progress',
      backgroundColor: ['rgb(255, 99, 132)','rgb(100, 5, 100)'],
      borderColor: 'rgb(255, 99, 132)',
      data: [projects, 19-projects],
    }]
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {}
  };
  new Chart(
    document.getElementById('chart'),
    config
    );
  }
  