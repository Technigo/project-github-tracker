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
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
          hoverOffset: 4,
          responsive: true,
          maintainAspectRatio: false,
        },
      ],
    },
  };
  const myChart = new Chart(ctx, config);
};
