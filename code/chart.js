//DOM-selector for the canvas 👇
const ctx = document.getElementById("chart").getContext("2d");

//"Draw" the chart here 👇
const fetchChart = (amount) => {
  const labels = ["Completed Projects", "Remaining Projects"];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Technigo projects",
        backgroundColor: ["rgb(57, 91, 100)", "rgb(148, 180, 159)"],
        borderColor: "#f7e9e7",
        data: [amount, 19 - amount],
        hoverOffset: 4,
      },
    ],
  };

  const config = {
    type: "pie",
    data: data,
  };

  const myChart = new Chart(ctx, config);
};
