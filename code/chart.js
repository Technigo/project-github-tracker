//Font-family for the chart
Chart.defaults.font.family = 'Source Code Pro, monospace';

//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇
const activateChart = (projects) => {
    const labels = [
        'Projects done',
        'Projects to do'
      ]
   
      const data = {
        labels: labels,
        datasets: [{

          data: [projects, 19-projects],
          label: 'Projects',
          backgroundColor: ['rgb(244, 132, 95)', 'rgb(220, 220, 220)']
        }]
      }

      const config = {
        type: 'doughnut',
        data: data,
        options: {}
      }

      const myChart = new Chart(document.getElementById('chart'),config);
      }
      
    
    
