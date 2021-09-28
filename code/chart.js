//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')


const drawChart = () => { 

    const config = {
        type: 'doughnut',
        data: { 
      
        labels: [
          'Finished projects',
          'projects left',
         
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [5, 20-5],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)'
           
          ],
          hoverOffset: 4
        }]
      }
    }  





  const myChart = new Chart(ctx, config)


}