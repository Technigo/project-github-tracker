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
        backgroundColor: ["rgb(55, 99, 132)", "rgb(80, 92, 125)"],
        hoverOffset: 4,
      },
    ],
  },
};

const myChart = new Chart(ctx, config);
