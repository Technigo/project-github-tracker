//DOM-selector for the canvas 👇
const ctx = document.getElementById("chart").getContext("2d");

//"Draw" the chart here 👇
const drawChart = (amount) => {
  const config = {
    type: "doughnut",
    data: {
      labels: ["Finished", "Upcoming"],
      datasets: [
        {
          label: "Bootcamp projects",
          data: [amount, 20 - amount],
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
          hoverOffset: 4,
        },
      ],
    },
  };

  const MyChart = new Chart(ctx, config);
};
