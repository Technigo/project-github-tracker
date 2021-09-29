//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇

const totalTechnigoRepos = 19;

const drawChart = (amount) => {
  const config = {
    type: 'doughnut',
    data: {
      labels: [
        'Finished projects', // lime green
        'Projects left' // lighter
      ],
      datasets: [{
        label: 'progress chart',
        data: [amount, totalTechnigoRepos - amount],
        backgroundColor: [
          '#daff05', // lime green
          '#f1fabd' // lighter
        ],
        hoverOffset: 4
      }]
    },
  };

  const progressChart = new Chart(ctx, config);
};
