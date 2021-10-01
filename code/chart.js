//DOM-selector for the canvas 👇
const ctx = document.getElementById("chart").getContext("2d")

//"Draw" the chart here 👇

const drawChart = (amount) => {
  const config = {
    type: "doughnut",
    data: {
      labels: ["Finished projects", "Projects left"],
      datasets: [
        {
          label: "My First Dataset",
          data: [amount, 20 - 6],
          backgroundColor: ["rgb(255, 92, 88)", "rgb(242, 141, 138)"],
          hoverOffset: 4,
        },
      ],
    },
  }
  const myChart = new Chart(ctx, config)
}
