//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇
console.log('Pie chart is here')

const drawChart = (x) => {

    const data = {
        labels: [
          'Done!',
          'Not done, yet!',
          
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [x, 19-x],
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

  let myChart = new Chart(ctx,config);
}