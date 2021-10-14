//DOM-selector for the canvas 👇
const ctx = document.getElementById("chart").getContext("2d");

//"Draw" the chart here 👇
// console.log("Chart is heart");

const drawChart = (amount) => {
  const config = {
    type: "doughnut",
    data: {
      labels: ["Finished Projects", "Projects Left"],
      datasets: [
        {
          label: "My First Dataset",
          data: [amount, 20 - amount],
          backgroundColor: [
            "rgb(0, 130, 204)",
            "rgb(160, 0, 204)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    },
  };
  const myChart = new Chart(ctx, config);
};
