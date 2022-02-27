//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d') // don't really get what this does

const renderChart = (completedProjects) => {

    const labels = [
        'Projects done',
        'Projects left to do'
      ];
    
      const data = {
        labels: labels,
        datasets: [{
          label: 'Technigo Projects',
          backgroundColor: 'rgb(192, 113, 106)',
          borderColor: 'rgb(192, 113, 106)',
          data: [completedProjects, 19-completedProjects],
        }]
      };
    
      const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            
        }
      };


    new Chart(
    document.getElementById('chart'),
    config
)}

