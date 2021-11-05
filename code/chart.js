const ctx = document.getElementById("chart").getContext("2d");
const allProjects = 19;

const drawChart = (finishedProjects) => {
  const config = {
    type: "doughnut",
    data: {
      labels: ["Finished projects", "Projects left"],
      datasets: [
        {
          label: "Technigo projects",
          data: [finishedProjects, allProjects - finishedProjects],
          backgroundColor: ["rgb(204, 194, 193)", "rgb(140, 100, 114)"],
          hoverOffset: 4,
        },
      ],
    },
  };

  const myChart = new Chart(ctx, config);
};
