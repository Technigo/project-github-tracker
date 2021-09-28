//DOM-selector for the canvas 👇
const ctx = document.getElementById("chart").getContext("2d");

// Chart
const config = {
  type: "doughnut",
  data: {
    labels: ["Red", "Yellow"], //Change the label
    datasets: [
      {
        label: "My First Dataset", //Change the label
        data: [5, 19 - 5], // Change the data
        backgroundColor: ["rgb(255, 99, 132)", "rgb(255, 205, 86)"],
        hoverOffset: 4,
      },
    ],
  },
};

const reposChart = new Chart(ctx, config);
