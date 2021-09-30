const ctx = document.getElementById("chart").getContext("2d");

const drawChart = (amount) => {
  const config = {
    type: "doughnut",
    data: {
      labels: ["Finished projects", "Projects left"],
      datasets: [
        {
          label: "Technigo projects",
          data: [amount, 19 - amount],
          backgroundColor: ["rgb(204, 194, 193)", "rgb(107, 60, 56)"],
          hoverOffset: 4,
        },
      ],
    },
  };

  const myChart = new Chart(ctx, config);
};
