//DOM-selector for the canvas 👇
const ctx = document.getElementById("chart").getContext("2d");

//Chart text, design and labels

const drawChart = (amount) => {
  const config = {
    type: "doughnut",
    data: {
      labels: ["Finished projects", "Projects left"],
      datasets: [
        {
          label: "Repos chart",
          data: [amount, 19 - amount],
          backgroundColor: ["rgb(211,66,193)", "rgb(255,152,91)"],
          hoverOffset: 4,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            font: {
              size: 18,
            },
          },
        },
      },
    },
  };

  const repoChart = new Chart(ctx, config);
};
