//DOM-selector
const ctx = document.getElementById("chart").getContext("2d");

//Chart
const config = {
  type: "pie",
  data: {
    labels: ["Finished projects", "Projects left"],
    datasets: [
      {
        label: "My First Dataset",
        data: [5, 19 - 5],
        backgroundColor: ["rgb(0,250,154,0.20)", "rgb(228, 228, 228)"],
        hoverOffset: 4,
      },
    ],
  },
};

const myChart = new Chart(ctx, config);
