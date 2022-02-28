//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇
const drawChart = (filteredRepos) => { 


    
    const config = {
        type: 'doughnut',
        data: {
            labels: ['Finished projects', 'Unfinished projects'],
            datasets: [{   
              label: 'Bootcamp Progress',
              data: [
                  (filteredRepos.length), 19 - (filteredRepos.length)
              ],
              backgroundColor: ['rgb(255, 255, 255)','rgb(255, 99, 132)',],
              borderWidth: 1,
              borderColor: 'rgb(255, 99, 132)',
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels:  {
                        boxWidth: 20,
                        color: '',
                        color: 'rgb(0, 128, 0)',
                        padding: 30,
                        maxHeigth: 30,
                    },
                },
                title: {
                    display: true,
                    text: 'Bootcamp progress',
                    color: 'rgb(0, 128, 0)',
                    font: {
                        size: 32,
                    },
                 
                },
     

const myChart = new Chart(document.getElementById('chart'),config)
}
