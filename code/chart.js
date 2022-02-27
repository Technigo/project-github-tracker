//DOM-selector for the canvas 👇
const ctx = document.getElementById("chart").getContext("2d");
Chart.defaults.font.family = "Poppins";
//"Draw" the chart here 👇
const drawChart = (projects) => {
  const labels = ["DONE", "STILL TO DO"];

  const data = {
    labels: labels,
    datasets: [
      {
        data: [projects, 19 - projects],
        backgroundColor: ["rgb(157,219,201)", "#8286db"],
        borderColor: ["rgb(157,219,201)", "#8286db"],
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
