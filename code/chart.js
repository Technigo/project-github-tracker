//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇

const callingChart = (amountOfRepos) => {


const labels = [
    'Projects done',
    'Projects left to do'
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'Technigo Projects',
      backgroundColor: ['rgb(82, 183, 136)', 'rgb(0, 108, 117)'],
      borderColor: 'rgb(255, 99, 132)',
      data: [amountOfRepos, 19-amountOfRepos],
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      indexAxis: 'y',
      scales: {
        x: {
          suggestedMin: 0,
          suggestedMax: 19,
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
      }
    }
  };

  const myChart = new Chart(
    document.getElementById('chart'),
    config
  );

}