Chart.defaults.font.family = "Merriweather Sans, sans-serif";
//DOM-selector for the canvas 👇
const ctx = document.getElementById("chart").getContext("2d");

//"Draw" the chart here 👇
const makeChart = (finishedProjects) => {
  const labels = ["Finished projects", "Projects to do"];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: ["#ffa597", "#ffdfda"],
        borderColor: "black",
        borderWidth: "1",
        data: [finishedProjects, 19 - finishedProjects],
      },
    ],
  };

  const config = {
    type: "doughnut",
    data: data,
    options: {},
  };

  const myChart = new Chart(document.getElementById("chart"), config);
};
