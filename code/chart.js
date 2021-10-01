//DOM-selector
const ctx = document.getElementById("chart").getContext("2d");

//The chart
const config = {
  type: "pie",
  data: {
    labels: ["Finished projects", "Projects left"],
    datasets: [
      {
        label: "My First Dataset",
        data: [5, 19 - 5],
        backgroundColor: ["#ee6c4d", "#3d5a80"],
        hoverOffset: 4,
      },
    ],
  },
};

const myChart = new Chart(ctx, config);
