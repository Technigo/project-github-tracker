//DOM-selector for the canvas 👇
const ctx = document.getElementById("myChart").getContext("2d");

//"Draw" the chart here 👇
const drawChart = (amount) => {
  const config = {
    type: "doughnut",
    data: {
      labels: ["Done", "Left"],
      datasets: [
        {
          label: "My First Dataset",
          data: [amount, 20-amount],
          backgroundColor: [
            "#f687d7",
            "#ffb55e",
          ],
          hoverOffset: 4,
        },
      ],
    },
  };

  const myChart = new Chart(ctx, config);
}; 