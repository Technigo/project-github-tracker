//DOM-selector for the canvas 👇
const ctx = document.getElementById("chart").getContext("2d");

//"Draw" the chart here 👇
// X of 20 done

const drawChart = (amount) => {
  const config = {
    type: "doughnut",
    data: {
      labels: ["Finished projects", "Projects left"],
      datasets: [
        {
          label: "Repos chart",
          data: [amount, 19 - amount], //length of repo array ,
          backgroundColor: [
            "rgb(255, 99, 132)", //own colors
            "rgb(54, 162, 235)",
          ],
          hoverOffset: 4,
        },
      ],
    },
  };

  const repoChart = new Chart(ctx, config);
};
