//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇

//Invoke the drawChart function to connect the two JS files
const drawChart = (amount) => {

const config = {
    type: 'doughnut',
    data: {
        labels: [
          'Projects completed',
          'Projects left',  
        ],

        datasets: [{
          label: 'My First Dataset',
          data: [amount, 20-amount],
          backgroundColor: [
            'rgb(255, 153, 51)',
            'rgb(65, 132, 228)'
          ],
          hoverOffset: 4
        }]
      },
  };


  //Present the chart in the browser
const myChart = new Chart(ctx, config)
}

//'rgb(205, 217, 229)' white/greyish color for label text