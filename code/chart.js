const ctx = document.getElementById('chart').getContext('2d');


const drawChart = (amount) => {
    const config = {
        type: 'doughnut',
        data: {
        labels: [
          'Completed projects',
          'Projects left to build',
        ],
        datasets: [{
          label: 'My Technigo projects',
          data: [amount, 19-amount],
          backgroundColor: [
            'rgb(235, 14, 14)',
            'rgb(64, 19, 19)',
          ],
          hoverOffset: 4
        }],
      },
    };

    const projectsChart = new Chart(ctx, config);
}
