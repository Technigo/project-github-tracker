//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')
const ctx2 = document.getElementById('chart2').getContext('2d')

//"Draw" the chart here 👇
const drawChart = (amount) => {
    const config = {
        type: 'doughnut',
        data: {
            labels: [
              'Finished projects',
              'Projects left'
            ],
            datasets: [{
              label: 'Technigo projects',
              data: [amount, 19-amount],
              backgroundColor: [
                'rgb(255, 205, 86)',
                'rgb(255, 99, 132)'
                
              ],
              hoverOffset: 4
            }]
          },
      }
    
    const myChart = new Chart(ctx, config);
    }

    const drawTimeLine = (date) => {
      const config = {
          type: 'line',
          data: {
              labels: [
                'Week 2',
                'Week 3',
                'Week 4',
                'Week 5',
                'Week 6',
                'Week 7',
                'Week 8',
                'Week 9',
                'Week 10',
                'Week 11',
                'Week 12',
                'Week 13',
                'Week 14',
                'Week 15',
                'Week 16',
                'Week 17',
                'Week 18',
                'Week 19',
                'Week 20'
              ],
              datasets: [{
                label: 'Technigo projects',
                data: [date],
                backgroundColor: [
                  'rgb(255, 205, 86)',
                  'rgb(255, 99, 132)'
                  
                ],
                hoverOffset: 4
              }]
            },
        }
      
      const myChart2 = new Chart(ctx2, config);
      }
  



  