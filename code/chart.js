const ctx = document.getElementById("chart").getContext("2d");

//"Draw" the chart here

const config = {
  type: "doughnut",

  data: {
    labels: ["Finished projects", "Projects left"],

    datasets: [
      {
        label: "My Projects",
        data: [6, 19 - 6],
        backgroundColor: ["rgb(132, 207, 189)", "rgb(139, 247, 189)"],
        hoverOffset: 2,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 25,
          },
        },
      },
    },
  },
};

const myChart = new Chart(ctx, config);
