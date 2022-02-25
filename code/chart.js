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
            label: "projects",
            data: [amount, 21-amount],
            backgroundColor: [
              "#a4b2b0",
              "#8ab2b4",
            ],
          },
        ],
      },
    }
 const myChart = new Chart(ctx, config)
}