//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇
const drawChart = (repos) => {


const labels = [
    'Compleated Projects',
    'Remaining Projects',
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: ['#B6766D', '#F8E8DE'],
      borderColor: '#f7e9e7',
      data: [repos, 19-repos],
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
