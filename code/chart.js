const ctx = document.getElementById('chart').getContext('2d') 

const renderChart = (completedProjects) => {


    const labels = [
        'Projects done',
        'Projects left to do'
      ];
    
      const data = {
        labels: labels,
        datasets: [{
          backgroundColor: 'rgb(217, 169, 165)',
          label: 'Technigo Projects',
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

