//DOM-selector for the canvas 👇
const ctx = document.getElementById("chart").getContext("2d");

const drawChart = (amount) => {
  const config = {
    type: "doughnut",
    data: {
      labels: ["Finished Projects", "Projects Left"],
      datasets: [
        {
          label: ["Finished Projects", "Projects Left"],
          data: [amount, 19 - amount],
          backgroundColor: ["#76b5c5", "#eab676"],
          hoverOffset: 4,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            font: {
              size: 12,
              family: "'Poppins',sans-serif",
              color: "rgba(26, 26, 24, 0.849)",
            },
          },
        },
      },
    },
  };
  const myChart = new Chart(ctx, config);
};
