const drawChart = (finishedProjects) =>{
//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('3d')

//"Draw" the chart here 👇
const config = {
    type: "pie",
    data: {
      labels: ["Finished projects", "Projects left"],
      datasets: [
        {
          label: "My First Dataset",
          data: [finishedProjects, 19 - finishedProjects],
          backgroundColor: ["rgb(0,250,154,0.20)", "rgb(228, 228, 228)"],
          hoverOffset: 4,
        },
      ],
    },
  };
  const myChart = new Chart(
    document.getElementById('chart'),
    config
  );
}
