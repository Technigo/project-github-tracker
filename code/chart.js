//DOM-selector for the canvas 👇
const ctx = document.getElementById("chart").getContext("2d");

//"Draw" the chart here 👇
Chart.defaults.font.size = 16;
Chart.defaults.color = "#5f939a";

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
          hoverOpacity: 1,
          borderColor: "#161616",
          responsive: true,
          maintainAspectRatio: false,
        },
      ],
    },
  };
  const myChart = new Chart(ctx, config);
};
