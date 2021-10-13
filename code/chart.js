//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇

const drawChart = (amount) =>{
    const config = {
      type: 'doughnut',
      data: {
          labels: [
            'Completed Projects',
            'Remaining Projects',
          ],
          datasets: [{
            label: 'My First Dataset',
            data: [amount , 20-amount],
            backgroundColor: [
              'rgb(255, 192, 203)',
              'rgb(135,190,231)'
              
            ],
            hoverOffset: 4
          }]
        },
  
      };
    const myChart = new Chart(ctx, config)
}
