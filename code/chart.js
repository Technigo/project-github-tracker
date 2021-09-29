//DOM-selector for the canvas 👇
const ctx = document.getElementById("chart").getContext("2d");

//"Draw" the chart here 👇
const drawChart = (amount) => {
  const config = {
    type: "polarArea",
    data: {
      labels: ["Finished Projects", "Projects Left"],
      datasets: [
        {
          label: "My First Dataset",
          data: [amount, 19 - amount],
          backgroundColor: ["rgb(255, 99, 132)", "rgb(75, 192, 192)"],
        },
      ],
    },
  };

  const myChart = new Chart(ctx, config);
};
