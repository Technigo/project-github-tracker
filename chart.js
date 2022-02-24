//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇
const drawChart = (amount) => {
const labels = [
              'Completed projects',
              'Projects to do',
          ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: [
                  '#a07a99',
                  '#a7c0b8',
              ],
      borderColor: '#000000',
      data: [amount, 19 - amount],
    }]
  };

  const options = {
    layout: {
        padding: 25 
    },
    plugins: {
        legend: {
            labels: {
                font: {
                    size: 16
                }
            }
        }
    }
}

  const config = {
    type: 'doughnut',
    data: data,
    options: options
  };

   const myChart = new Chart(ctx, config);
}

 /* 
const drawChart = (amount) => {
  const config = {
      type: 'doughnut',
      data: {
          labels: [
              'Completed projects',
              'Projects to do',
          ],
          datasets: [{
              label: 'My First Dataset',
              data: [amount, 19 - amount],
              backgroundColor: [
                  '#a07a99',
                  '#a7c0b8',
              ],

              hoverOffset: 4
          }]
      },
      options: {
          layout: {
              padding: 25 
          },
          plugins: {
              legend: {
                  labels: {
                      font: {
                          size: 15
                      }
                  }
              }
          }
      }
  };
  const myChart = new Chart(ctx, config);
}
*/