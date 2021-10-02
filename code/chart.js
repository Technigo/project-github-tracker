//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d');

//"Draw" the chart here 👇

const drawChart = (amount) => {
  const config = {
    type: 'doughnut',
    data: {
      labels: ['Completed', 'Remaining'],
      datasets: [
        {
          label: 'My First Dataset',
          data: [amount, 20 - amount], // 6 finished projects and 14 projects remaining
          backgroundColor: ['#52734D', '#AAAAAA'],
          hoverOffset: 4,
        },
      ],
    },
  };
  const myProjects = new Chart(ctx, config); //Taking two arguments: 1) where to put 'ctx' and 2) what to put 'config'
};
