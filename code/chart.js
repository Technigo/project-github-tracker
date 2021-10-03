//DOM-selector for the canvas 👇
const ctx = document.getElementById("chart").getContext("2d");
Chart.defaults.font.size = 16;
Chart.defaults.color = "#ffffff";

//"Draw" the chart here 👇
const drawChart = amount => {
  const config = {
    type: "doughnut",
    data: {
      labels: ["Finished Projects", "Projects Left"],
      datasets: [
        {
          label: "My First Dataset",
          data: [amount, 20 - amount],
          backgroundColor: ["#002929", "#545454"],
          hoverOffset: 4,
        },
      ],
    },
  };

  const myChart = new Chart(ctx, config);
};
