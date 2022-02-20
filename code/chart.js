const ctx = document.getElementById('chart').getContext('2d')

const drawChart = (amount) => {
const config = {
    type: 'doughnut',
    data: {
        labels: [
          'Projects done',
          'Projects left',
          'Projects in total'
    
        ],
        datasets: [{
          label: 'My Projects',
          data: [amount, 19-amount, 19],
          backgroundColor: [
            '#e3f7ba',
            'rgb(252, 241, 175)',
            '#FFECE9'
          ],
          hoverOffset: 4
        }]
      },
    };
    
const repoChart = new Chart(ctx, config);
}