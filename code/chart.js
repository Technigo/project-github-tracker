// font family for chart
Chart.defaults.font.family = "Poppins";

// DOM-selector for the chart
const ctx = document.getElementById("chart").getContext("2d");

// function to draw the chart, with the "completed projects" as an argument
const renderChart = (projects) => {
  const labels = ["completed projects", "not yet completed projects"];

  const data = {
    labels: labels,
    datasets: [
      {
        data: [projects, 19 - projects],
        backgroundColor: ["#2FC5EE", "#FF1E00"],
        borderColor: "#FEFBF3",
        hoverOffset: 8,
        hoverBorderColor: ["#FF1E00"],
      },
    ],
  };

  const config = {
    type: "doughnut",
    data: data,
    options: {
      font: {
        size: 10,
      },
    },
  };

  new Chart(document.getElementById("chart"), config);
};
