//DOM-selector for the canvas 👇
const ctx = document.getElementById("chart").getContext("2d")
// const ctxtwo = document.getElementById('LanguageChart').getContext('2d')
//"Draw" the chart here 👇

const drawChart = (amount) => {
  const config = {
    type: "bar",
    data: {
      labels: ["Finished projects", "Projects left"],
      datasets: [
        {
          data: [amount, 20 - amount],
          barPercentage: 20,
          barThickness: 100,
          maxBarThickness: 100,
          borderRadius: 2,
          backgroundColor: ["#D4B499", "#B4846C"],

          label: "Technigo Bootcamp Projects",
          hoverOffset: 4,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  }

  const myChart = new Chart(ctx, config)
}

// const drawLanguageChart = (html_percentage, css_percentage, js_percentage)  => {

//   const ctxLang = document.getElementById('languageChart');
//   const dataLang = {
//     labels = ['HTML', 'CSS', 'Javascript'],
//     datasets: [{
//       label: 'Language',
//       data: [html_percentage, css_percentage, js_percentage],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(255, 159, 64, 0.2)',
//         'rgba(255, 205, 86, 0.2)',

//       ],
//       borderColor: [
//         'rgb(255, 99, 132)',
//         'rgb(255, 159, 64)',
//         'rgb(255, 205, 86)',

//       ],
//       borderWidth: 1
//     }]
//   };

//   const barChart = {
//     type: 'bar',
//     data: dataLang,
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true
//         }
//       }
//     },
//   }
//   const langChart = new Chart(ctxLang, barChart);
// }
