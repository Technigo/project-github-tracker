//DOM-selector for the canvas 👇
const ctx = document.getElementById("chart").getContext("2d");

//"Draw" the chart here 👇

const drawChart = (amount) => {
  //This function is being called inside the getRepos function

  const config = {
    type: "doughnut",
    data: {
      labels: ["P. Finished", "P. Left"],
      datasets: [
        {
          label: "My First Dataset",
          data: [amount, 20 - amount], //1st number:the lenght of my repo array, 20(total projects I must do) minus the repo array
          backgroundColor: ["#FFB319", "grey"],
          hoverOffset: 4,
        },
      ],
    },
  };
  const myChart = new Chart(ctx, config);
};
