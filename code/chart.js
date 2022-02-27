//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d') // don't really get what this does

const renderChart = ((completedProjects) => {

    const data = {
    labels: [''],
    datasets: [{
      data: [completedProjects],
      label: 'completed',
    backgroundColor: 'rgb(63, 103, 126)',
    }, {
        data: [19-completedProjects],
        label: 'remaining',
        backgroundColor: 'rgb(63, 203, 226, 0.1)',
    }]
  }

  const config = {
    type: 'bar',
    data: data,
    options: {
        indexAxis: 'y',
        scales: {
        x: {
            stacked: true,
            grid: {
                display: true,
            },
        },
        y: {
            stacked: true,
            grid: {
                display: true,
            }
        }
    },
    
    plugins: {
        title: {
            display: true,
            text: `Technigo projects completed: ${completedProjects} of 19`,
            position: 'top',
        },
        legend: {
            display: false,
            position: 'top',
        }
    }
  }
}
    new Chart(
    document.getElementById('chart'),
    config
)})
renderChart()
