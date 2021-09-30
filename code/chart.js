//DOM-selector for the canvas 👇
const ctx = document.getElementById("chart").getContext("2d");

const plugin = {
  id: "custom_canvas_background_color",
  beforeDraw: (chart) => {
    const ctx = chart.canvas.getContext("2d");
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "rgb(189,219,227)";
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};

//"Draw" the chart here 👇
const drawChart = (amount) => {
  const config = {
    type: "polarArea",
    data: {
      labels: [
        "Finished Projects",
        "Projects Left",
        "Individual Projects",
        "Team Projects",
      ],
      datasets: [
        {
          label: "My First Dataset",
          data: [amount, 19 - amount, amount - 4, amount - 2],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(75, 192, 192)",
            "rgb(247,226,0)",
            "rgb(84,81,185)",
          ],
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "My Github Repositories",
          color: "#138",
          font: {
            size: 25,
          },
        },
      },
      responsive: true,
      borderColor: "#d32",
      color: "#138",
    },
    plugins: [plugin],
  };

  const myChart = new Chart(ctx, config);
  myChart.destroy();
};
