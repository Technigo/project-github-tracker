//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇
/*
const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: ['rgb(255, 99, 132)','green'],
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
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

  */

  
const drawChart = (amount) => {
  const config = {
      type: 'doughnut',
      data: {
          labels: [
              'Finished projects',
              'Projects left',
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
