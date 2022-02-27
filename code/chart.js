//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d') // don't really get what this does

const renderChart = ((completedProjects) => {

    const labels = [
        'Projects done',
        'Projects left to do'
    ]

    const data = {
    datasets: [{
      data: [completedProjects],
      label: 'completed',
    backgroundColor: 'rgb(63, 103, 126)',
    }, {
        data: [19-completedProjects],
        label: 'remaining',
        backgroundColor: 'rgb(251, 139, 55)',
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

