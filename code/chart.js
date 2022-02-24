//DOM-selector for the canvas 👇
const ctx = document.getElementById('mychart').getContext('2d')

//"Draw" the chart here 👇

const Chart = (amount) => {
    const data = {
      labels: [
        'Finished projects',
        'Projects left'
  
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [amount, 20-amount],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
        ],
        hoverOffset: 4
      }]
    };
    const config = {
      type: 'doughnut',
      data: data,
    };





const myChart = new Chart(ctx, config);