//Font-family for the chart
Chart.defaults.font.family = 'Source Code Pro, monospace';

//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇
const activateChart = (projects) => {
    const labels = [
        'Finished projects',
        'Remaining projects',
      ]
   
      const data = {
        labels: labels,
        datasets: [{

          data: [projects, 19-projects],
          label: 'My finished projects',
          backgroundColor: ['rgb(70, 70, 70)', 'rgb(170, 170, 170)']
        }]
      }

      const config = {
        type: 'doughnut',
        data: data,
        options: {}
      }

      const myChart = new Chart(document.getElementById('chart'),config);
      }
      
    
    
