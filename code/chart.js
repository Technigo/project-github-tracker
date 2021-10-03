//DOM-selector for the canvas 👇
const ctx = document.getElementById("chart").getContext("2d");

const drawProgressChart = (repos) => {
  const completedProjects = repos.length;
  const totalProjects = 20;

  const labels = repos.map((repo) => repo.name);
  const data = repos.map((repo) => repo.size);

  const chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Completed Projects", "Projects left to build"],
      datasets: [
        {
          data: [completedProjects, totalProjects - completedProjects],
          backgroundColor: ["blue", "red"],
          hoverOffset: 4,
        },
      ],
    },
  });
};
