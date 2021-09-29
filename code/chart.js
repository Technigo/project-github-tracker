//DOM-selector for the canvas 👇
const ctx = document.getElementById('myChart').getContext('2d');

//"Draw" the chart here 👇


  const drawChart = (amount) => {
    const config = {
        type: 'doughnut',
        data: {
            labels: [
              'Finished Projects',
              'Projects Left',
            ],
            datasets: [{
              label: 'My First Dataset',
              data: [amount, 19-amount],
              backgroundColor: [
                '#95EF87',
                '#00DDB0',
              ],
              hoverOffset: 4
            }]
          },
      };
    
    const myChart = new Chart(
        ctx,
        config
      );
  }

  