//DOM-selector for the canvas 👇
const ctx = document.getElementById("chart").getContext("2d");

//"Draw" the chart here 👇

const config = {
  type: "pie",
  data: {
    labels: ["Finished projects", "Projects left"],
    datasets: [
      {
        label: "My First Dataset",
        data: [5, 20 - 5],
        backgroundColor: ["rgb(0,250,154,0.20)", "rgb(250, 250, 250, 0.60)"],
        hoverOffset: 4,
      },
    ],
  },
};

const myChart = new Chart(ctx, config);
