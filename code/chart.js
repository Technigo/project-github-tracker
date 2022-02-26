//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇
const drawChart = (repos) => {

const labels = [
    'Completed projects',
    'Remaining projects',
    
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor:  ['#A9C9FF', '#fde3fb'],
      borderColor:'pink',
      data: [repos, 19-repos],
    }]
  };

  const config = {
    type: 'pie',
    data: data,
  };

  const myChart = new Chart(
    document.getElementById('chart'),
    config
  );
}