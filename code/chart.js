//DOM-selector for the canvas 👇
const ctx = document.getElementById('progressChart').getContext('2d');

//"Draw" the chart here 👇

const drawProgressChart = (amountOfRepos) => {
  const data = {
    labels: ['Finished Projects', 'Projects Left'],
    datasets: [
      {
        label: 'Technigo boot camp projects',
        data: [amountOfRepos, 20 - amountOfRepos],
        // length of the repo array, 20 - length of the repo array
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 205, 86)'],
        hoverOffset: 4,
      },
    ],
  };
  const config = {
    type: 'doughnut',
    data: data,
    options: {
      plugins: {
        // 'legend' now within object 'plugins {}'
        legend: {
          labels: {
            color: 'white', // not 'fontColor:' anymore
            // fontSize: 18  // not 'fontSize:' anymore
            font: {
              size: 12, // 'size' now within object 'font {}'
            },
          },
        },
      },
    },
  };
  const progressChart = new Chart(ctx, config);
};

const drawLanguagesChart = (html_percent, css_percent, js_percent) => {
  // put the DOM-selector for the second canvas here because
  // the id="languageChart" hasn't been created yet because of innerHTML i script.js
  // if we put it at start of the chart.js, we wouldn't know what languageChart is
  const ctx_languages = document.getElementById('languagesChart');
  const data_2 = {
    labels: ['HTML', 'CSS', 'Javascript'],
    datasets: [
      {
        label: 'Usage of languages (percentage)',
        data: [html_percent, css_percent, js_percent],
        backgroundColor: [
          'rgb(255, 159, 64)',
          'rgb(128, 0, 128)',
          'rgb(255, 205, 86)',
        ],
        borderColor: [
          'rgba(255, 159, 64, 0.2)',
          'rgb(128, 0, 128, 0.2)',
          'rgba(255, 205, 86, 0.2)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const stackedBar = new Chart(ctx_languages, {
    type: 'bar',
    data: data_2,
    options: {
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
      plugins: {
        legend: {
          labels: {
            color: 'black',
            font: {
              size: 12,
            },
          },
        },
      },
    },
  });
};
