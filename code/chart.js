//DOM-selector for the canvas 👇
const ctx = document.getElementById("myChart").getContext("2d");

//"Draw" the chart here 👇

const drawChart = (amount) => {
  const config = {
    type: "bar",
    data: {
      labels: ["Finished projects", "Projects to do"],
      datasets: [
        {
          label: "My First Dataset",
          data: [amount, 19 - amount],
          backgroundColor: ["#13233d", "#fafafa"],

          hoverOffset: 4,
        },
      ],
    },
    options: {
      layout: {
        padding: 25,
      },
      plugins: {
        legend: {
          labels: {
            font: {
              size: 15,
            },
          },
        },
      },
    },
  };
  const myChart = new Chart(ctx, config);
};
