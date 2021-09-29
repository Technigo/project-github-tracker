//DOM-selector for the canvas 👇
const ctx = document.getElementById("chart").getContext("2d");

//"Draw" the chart here 👇

const drawChart = amount => {
  const config = {
    type: "pie",
    data: {
      labels: ["finished projects", "projects left"],

      datasets: [
        {
          label: "My First Dataset",
          data: [amount, 20 - amount],
          backgroundColor: ["#5F939A", "#D8AC9C"],
          hoverOffset: 4,
          responsive: true,
          maintainAspectRatio: false,
        },
      ],
    },
  };
  const myChart = new Chart(ctx, config);
};
