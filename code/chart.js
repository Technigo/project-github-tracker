//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇

const labels = [
    'Completed',
    'Left to complete',
  ];



const renderChart = ((projects) => { //added


  const data = {
    labels: labels,
    datasets: [{
      label: 'My projecs',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [projects, 19-projects],
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {}
  };

  const myChart = new Chart(
    document.getElementById('chart'), config);
}); //added