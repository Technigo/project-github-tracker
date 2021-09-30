//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')
// const ctxtwo = document.getElementById('LanguageChart').getContext('2d')
//"Draw" the chart here 👇

const drawChart = (amount) => {
  const config = {
    type: 'bar',
    data: {
      labels: [
        'Finished projects',
        'Projects left'
      ],
      datasets: [{
        data: [amount, 20 - amount],
        barPercentage: 20,
        barThickness: 100,
        maxBarThickness: 100,
        borderRadius: 2,
        backgroundColor: [
          '#F5C6A5',
          '#FE8F8F',
        ],
        label: 'Technigo Bootcamp Projects',
        hoverOffset: 4
      }]
    },
  };

  const myChart = new Chart(ctx, config);
};





  



