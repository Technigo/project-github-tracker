//DOM-selector for the canvas 👇
const ctx = document.getElementById("chart").getContext("2d");

//"Draw" the chart here 👇

const drawChart = (amount) => {
  const data = {
    labels: ["Finished Projects", "Total Projects"],
    datasets: [
      {
        label: "My First Dataset",
        data: [amount, 20 - amount],
        backgroundColor: ["#8AA2A0", "#D6A495"],
        hoverOffset: 4,
      },
    ],
  };

  const config = {
    type: "doughnut",
    data: data,
  };

  const myChart = new Chart(ctx, config);
};
