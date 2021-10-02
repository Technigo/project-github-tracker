//DOM-selector for the canvas
const ctx = document.getElementById("chart").getContext("2d")

//Draw the chart here
const drawChart = (amount) => {
  const config = {
    type: "bar",
    data: {
      labels: ["Finished projects", "Projects left"],
      datasets: [
        {
          label: "Technigo Bootcamp Projects",
          data: [amount, 20 - amount],
          barPercentage: 20,
          barThickness: 100,
          maxBarThickness: 100,
          borderRadius: 2,

          backgroundColor: [
            "rgba(255, 98, 132, 0.3)",
            "rgba(255, 169, 63, 0.3)",
          ],
          borderColor: ["rgb(255, 98, 132)", "rgb(255, 169, 63)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  }

  const myChart = new Chart(ctx, config)
}
