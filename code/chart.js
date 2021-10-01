// DOM-selector for the canvas 
const ctx = document.getElementById('myChart').getContext('2d');

// Generate the chart based on the data fetched on script.js

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
                '#D365C8',
                '#3aafc9',
              ],
              hoverOffset: 4
            }]
          },
          options: {
            // The first two options make the chart responsive
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  color: "white",
                  font: {
                    size: 20
                  }
                }
              }
            }
          }
      };
    
    const myChart = new Chart(
        ctx,
        config
      );
  }

  