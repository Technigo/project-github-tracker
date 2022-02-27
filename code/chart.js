//DOM-selector for the canvas
const ctx = document.getElementById('chart').getContext('2d')

// the function that draws the chart of finished/remaining projects. 
//It gets the value from line 60 in script.js where doughnuCounter and technigoRepos.length 
// is passing the filtered repos length to the chart here

const doughnutCounter = (projects) => {
    const labels = [
        'Finished projects',
        'Remaining projects',
      ];
   
      const data = {
        labels: labels,
        datasets: [{
        //here is the calculation for remaining projects
          data: [projects, 19-projects],
          label: 'My finished projects',
          backgroundColor: ['rgb(217, 96, 152)', 'rgb(50, 82, 136)'],
          borderColor: 'rgb(38, 0, 27)',
        }]
      };

      const config = {
        type: 'doughnut',
        data: data,
        options: {}
      };

      
      const myChart = new Chart(document.getElementById('chart'),config);
      }
      