//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇

const drawChart = (amount) => {
  const config = {
    type: "doughnut",
    data: {
      labels: ["Completed projects", "Projects left to build"],
      datasets: [{
        label: "My Technigo projects",
        data: [amount, 19 - amount],
        backgroundColor: ["rgb(7,145,96)", "rgba(90, 112, 55, 0.1)"],
        borderColor: ["rgb(0,0,0)"],
        borderWidth: 0.3,
        hoverOffset: 4,
        },
        ],
    },
  };
    
const projectsChart = new Chart(ctx, config);
}
    