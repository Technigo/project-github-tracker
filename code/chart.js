// font family & color for the chart
Chart.defaults.font.family = "Roboto, sans-serif";
Chart.defaults.color = "#333";

// DOM-selector for the chart
const ctx = document.getElementById("chart").getContext("2d");

// function to draw the chart, with the "completed projects" as an argument
const renderChart = (projects) => {
  const data = {
    labels: ["completed projects", "not yet completed projects"],
    datasets: [
      {
        data: [projects, 19 - projects],
        backgroundColor: ["#2FC5EE", "#FF1E00"],
        borderColor: "#FEFBF3",
        hoverOffset: 8,
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
      layout: {
        padding: 15,
      },
    },
  };

  new Chart(ctx, config);
};
