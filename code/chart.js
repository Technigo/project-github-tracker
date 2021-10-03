//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d');

//"Draw" the chart here 👇

const drawChart = (amount) => {
    const config = {
        type: 'doughnut',
        data: {
        labels: [
          'Projects done',
          'Projects left to do',
        ],
        datasets: [{
          label: 'My Technigo projects',
          data: [amount, 19-amount],
          backgroundColor: [
            'rgb(219,57,141)',
            'rgb(0,255,255)',
          ],
          hoverOffset: 4
        }],
      },
    };

    const projectsChart = new Chart(ctx, config);
}
