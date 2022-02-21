const ctx = document.getElementById("chart").getContext("2d");
let chart;
const drawChart = (repos) => {
  const completedProjects = repos.length;
  const upcommingProjects = 18 - repos.length;
  if (chart) {
    chart.destroy();
  }
  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Completed projects", "Upcomming projects"],
      datasets: [
        {
          label: "My Projects",
          data: [completedProjects, upcommingProjects],
          backgroundColor: ["rgb(255, 151, 112)", "rgb(112, 214, 255)", "rgb(255, 205, 86)"],
          hoverBorderColor: "rgb(233, 255, 112)",
          weight: 3,
          hoverOffset: 4,
        },
      ],
    },
  });
};
