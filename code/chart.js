//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇

const drawChart = (dataPoints) => {

    const data = {
        labels: ["Finished Projects", "Unfinished Projects"],
        datasets: [{
          label: '# of Projects',
          data: dataPoints,
          backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          borderWidth: 1,
          hoverOffset: 4
        }]
    };
    
    
    const config = {
        type: 'doughnut',
        data: data,
      };
    
    const myChart = new Chart(ctx, config)
}
