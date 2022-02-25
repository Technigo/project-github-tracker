//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇
const activateChart = (projects) => {

const labels = [
    'Projects completed',
    'Projects in pipeline',
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: ['rgb(255, 99, 132)','rgb(255, 69, 0)'], 
      borderColor: ['rgb(255, 99, 132)','rgb(255, 69, 0)'],
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {}
  };
  const myChart = new Chart(
    document.getElementById('chart'),
    config
  );
}
 

