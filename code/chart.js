
Chart.defaults.font.size = 18
Chart.defaults.font.family = 'Raleway, sans-serif';
// Chart.defaults.font.family = 'monospace';

//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇

const drawChart = (amount) => {
const labels = [
    'Projects done',
    'Projects to be done',
    
  ];

  const data = {
    labels: labels,
    datasets: [ {
      label: 'My First dataset',
      backgroundColor: ['rgb(131, 28, 147)', 'rgba(19, 115, 199, 0.776)' ],
      borderColor: 'none',
      data: [amount, 19-amount],
    }]
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
        responsive: true,
        // maintainAspectRatio: false,
    }
};

const myChart = new Chart( 
document.getElementById('chart'),
config

);

};














// const myChart = () => {
//     const config = {
//         type: 'doughnut',
//         backgroundColor: [
//             '#1400D1',
//             '#CEE6FF'
//         ]
        
//     }
// }
