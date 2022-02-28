const showChart = (countRepos) => {
  const ctx = document.getElementById("chart").getContext("2d");

  const labels = [`Finished projects`, `Projects left`];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "My Technigo projects",
        backgroundColor: ["#9E9FCF", "#484B76"],
        borderColor: "rgb(66, 66, 66)",
        data: [countRepos, 19 - countRepos],
      },
    ],
  };

  Chart.defaults.font.family = "Source Serif Pro";
  Chart.defaults.font.size = "20";
  Chart.defaults.color = "#000000";

  const config = {
    type: "pie",
    data: data,
    options: {},
  };

  const myChart = new Chart(ctx, config);
};
