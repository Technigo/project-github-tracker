//DOM-selector for the canvas 👇
const ctx = document.getElementById("chart").getContext("2d");

//"Draw" the chart here 👇
const drawChart = (projects) => {
  const labels = ["Projects completed", "Projects in pipeline"];

  const data = {
    labels: labels,
    datasets: [
      {
        data: [projects, 19 - projects],
        backgroundColor: ["rgb(198, 255, 148)", "rgb(255, 69, 0)"],
        borderColor: ["rgb(198, 255, 148)", "rgb(255, 69, 0)"],
      },
    ],
  };

  const config = {
    type: "doughnut",
    data: data,
    //     // options: {}
  };

  new Chart(document.getElementById("chart"), config);
};
