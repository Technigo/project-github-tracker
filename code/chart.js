const ctx = document.getElementById("chart").getContext("2d");

// Chart
const drawChart = (numberOfProjects) => {
  const config = {
    type: "doughnut",
    data: {
      labels: ["Finished projects", "Projects left"],
      datasets: [
        {
          label: "Technigo Projects",
          data: [numberOfProjects, 19 - numberOfProjects],
          backgroundColor: ["rgb(255, 99, 132)", "rgb(255, 205, 86)"],
          hoverOffset: 5,
        },
      ],
    },
  };

  const reposChart = new Chart(ctx, config);
};
