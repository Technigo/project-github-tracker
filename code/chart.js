//DOM-selector for the canvas 👇
const ctx = document.getElementById("chart").getContext("2d");

//"Draw" the chart here 👇
const drawChart = (amount) => {
  const config = {
    type: "doughnut",
    data: {
      labels: ["Finished projects", "Projects left"],
      datasets: [
        {
          label: "Projects",
          data: [amount, 19 - amount],
          backgroundColor: ["#76b5c5", "#eab676"],
          hoverOffset: 4,
        },
      ],
    },
  };
  const myChart = new Chart(ctx, config);
};
