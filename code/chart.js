//DOM-selector for the canvas 👇
const ctx = document.getElementById("myChart").getContext("2d");

//"Draw" the chart here 👇
const drawChart = (amount) => {
  const config = {
    type: "doughnut",
    data: {
      labels: ["Finished projects", "Unfinished projects"],
      datasets: [
        {
          label: "My First Dataset",
          data: [amount, 20-amount],
          backgroundColor: [
            "#ff0000",
            "#2a1fff",
          ],
          borderColor:"black",
          hoverOffset: 4,
        },
      ],
    },
  };

  const myChart = new Chart(ctx, config);
};
