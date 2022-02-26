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
      backgroundColor: ['rgb(57, 138, 185)','rgb(28, 101, 140)'],
      borderColor: 'rgb(238, 238, 238)',
      data: [projects, 19-projects],
    }]
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      
    }
  };
  new Chart(
    document.getElementById('chart'),
    config
    );
  }
  