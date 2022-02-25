// DOM-selector for the chart
const ctx = document.getElementById("chart").getContext("2d");

// function to draw the chart, with the "completed projects" as an argument
const renderChart = (projects) => {
  const labels = ["completed projects", "not yet completed projects"];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: ["#2FC5EE", "#FF1E00"],
        borderColor: "#FEFBF3",
        data: [projects, 19 - projects],
      },
    ],
  };

  const config = {
    type: "doughnut",
    data: data,
    options: {},
  };

  new Chart(document.getElementById("chart"), config);
};
