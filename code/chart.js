// chart library 


//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//   var myChart = new Chart(ctx, config)

  const drawChart = (number) => {
    const config = {
      type: 'doughnut',
      data: {
        labels: ["Projects done", "Still to do"],
        datasets: [
          {
            label: "My first Dataset", 
            data: [number, 20 - number], // divide donut to 2 different parts
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
            ],
            hoverOffset:4,
          },
        ],
      },
    }
    const myChart = new Chart(ctx, config);
  };
