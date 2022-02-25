//DOM-selector for the canvas 👇
const ctx = document.getElementById("chart").getContext("2d");

//"Draw" the chart here 👇
const fetchChart = (repos) => {
  const labels = ["Completed Projects", "Remaining Projects"];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: ["rgb(57, 91, 100)", "rgb(148, 180, 159)"],
        borderColor: "#f7e9e7",
        data: [repos, 19 - repos],
      },
    ],
  };

  const config = {
    type: "doughnut",
    data: data,
    options: {
      plugins: {
        legend: {
          labels: {
            // This more specific font property overrides the global property
            font: {},
          },
        },
      },
    },
  };

  const myChart = new Chart(document.getElementById("chart"), config);
};
