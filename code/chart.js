const ctx = document.getElementById("chart").getContext("2d");

//"Draw" the chart here

const config = {
  type: "doughnut",
  data: {
    labels: ["Finished projects", "Projects left"],
    datasets: [
      {
        label: "My First Dataset",
        data: [6, 20 - 6],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  },
};

const myChart = new Chart(ctx, config);
