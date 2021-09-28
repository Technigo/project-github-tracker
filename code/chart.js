//DOM-selector for the canvas 👇
const ctx = document.getElementById("chart").getContext("2d");

//"Draw" the chart here 👇
const config = {
  type: "doughnut",
  data: {
    labels: ["Finished", "Upcoming"],
    datasets: [
      {
        label: "Bootcamp projects",
        data: [5, 15],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  },
};

const MyChart = new Chart(ctx, config);
