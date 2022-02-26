//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇

const doughnutCounter = (finishedProjects) => {
    const labels = [
        'Finished projects',
        'Remaining projects',
      ];
   
      const data = {
        labels: labels,
        datasets: [{
          label: 'My finished projects',
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 95, 155)'],
          borderColor: 'rgb(255, 99, 132)',
          data: [finishedProjects, 19-finishedProjects],
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
      doughnutCounter()
      