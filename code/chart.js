//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

const doughnutCounter = (projects) => {
    const labels = [
        'Finished projects',
        'Remaining projects',
      ];
   
      const data = {
        labels: labels,
        datasets: [{
          data: [projects, 19-projects],
          label: 'My finished projects',
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 95, 155)'],
          borderColor: 'rgb(255, 99, 132)',
        }]
      };

      const config = {
        type: 'doughnut',
        data: data,
        options: {}
      };

      
      const myChart = new Chart(document.getElementById('chart'),config);
      }
      