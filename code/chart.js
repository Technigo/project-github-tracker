//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇

console.log('chart is here')



const drawChart = () => {
  const config = {
    type: 'doughnut',
    data: {
      labels: [
        'Finished projects',
        'Projects left',
      ],
      datasets: [{
        label: 'My First Dataset',
          data: [5, 20-5],
          backgroundColor: [
            'rgb(42, 78, 98)',
            'rgb(160,168,175)'
          ],
          hoverOffset: 4
      }],
    },
  };

const myChart = new Chart(ctx, config)
}
    // These labels appear in the legend and in the tooltips when hovering different arcs
 

 