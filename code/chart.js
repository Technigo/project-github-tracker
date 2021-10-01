//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇
const config = {
    type: 'pie',
    data: {
        labels: [
          'Finished projects',
          
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [5, 20-5],
          backgroundColor: [
            `#e35809`,
            '#C7D3D4FF'
          ],
          hoverOffset: 4
        
        }]
    },
};
const myChart = new Chart(ctx, config)

