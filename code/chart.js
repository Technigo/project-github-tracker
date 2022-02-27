//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')


//"Draw" the chart here 👇

const drawChart = (number) => {
    const config = {
      type: "doughnut",
      data: {
        labels: ["DONE", "LEFT TO DO"],
        datasets: [
          {label: "PROJECT CHART",
            data: [number, 19 - number],
            backgroundColor: ["#ff874e", "#db738e"],
            hoverOffset: 4,
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 4
          },
        ],
      },
    };
    const myChart = new Chart(ctx, config);
  };