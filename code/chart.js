//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d');

//"Draw" the chart here 👇

const drawChart = (amount) => {
  const config = {
    type: 'doughnut',
    data: {
      labels: ['My completed projects', 'Projects left to do'],
      datasets: [
        {
          label: 'Dataset',
          data: [amount, 19 - amount],
          backgroundColor: ['#ddbea9', '#b7b7a4'],
          borderColor: '#22223b',
        },
      ],
    },
  };
  const myChart = new Chart(document.getElementById('chart'), config);
};

// const chart = new Chart(ctx, config);
