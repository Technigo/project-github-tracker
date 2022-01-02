//DOM-selector for the canvas 👇
const ctx = document.getElementById("chart").getContext("2d");

// 19 weekly projects
//"Draw" the chart here 👇

const drawChart = (amount) => {
  const config = {
    type: "doughnut",
    data: {
      labels: ["Finished Projects", "Projects Left"],
      datasets: [
        {
          label: "My First Dataset",
          data: [amount, 19 - amount],
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
          hoverOffset: 10,
        },
      ],
    },
  };

  const myChart = new Chart(ctx, config);
};
