//DOM-selector for the canvas 👇
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default function makeChart(completedProjects, chartId) {
  const ctx = document.getElementById(chartId).getContext("2d");

  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["completed", "total"],
      datasets: [
        {
          label: "Technigo spring 2022",
          data: [completedProjects, 19],
          backgroundColor: ["#358E89", "#D66882"],
          // borderColor: ["#404756"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      plugins: {
        title: {
          display: true,
          position: "bottom",
          text: "Technigo spring 2022",
        },
        legend: {
          display: false,
          position: "bottom",
        },
      },
    },
  });
}

//"Draw" the chart here 👇
