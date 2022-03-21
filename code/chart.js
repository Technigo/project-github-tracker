//DOM-selector for the canvas 👇
const ctx = document.getElementById('myChart').getContext('2d')

//"Draw" the chart here 👇
const drawChart = (amount) =>
{
    const config = {
      type: "bar",
      data: {
        labels: ["Completed projects", "Remaining projects"],
        datasets: [
          {
            label: "Technigo projects",
            data: [amount, 21-amount],
            backgroundColor: [
              "#c8cccf",
              "#778088",
            ],
            barThickness: "30",
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            }
          },
          y: {
            grid: {
              display: false
            }
          },
        }
      }
    }
 new Chart(ctx, config)
}