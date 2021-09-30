// DOM-selector for the canvas
const ctx = document.getElementById('progressChart').getContext('2d');

// function to draw the Progress Chart, we have passed in amount of repos as an argument
const drawProgressChart = (amountOfRepos) => {
  const data = {
    labels: ['Finished Projects', 'Unfinished Projects'],
    datasets: [
      {
        label: 'Technigo boot camp projects',
        data: [amountOfRepos, 19 - amountOfRepos],
        // length of the repo array, 19 minus length of the repo array
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
        legend: {
          labels: {
            color: 'white',
            font: {
              size: 12,
            },
          },
        },
      },
    },
  };
  const progressChart = new Chart(ctx, config);
};

// function to draw the Language Chart with three arguments
const drawLanguagesChart = (html_percent, css_percent, js_percent) => {
  // put the variable for the second canvas here because
  // the id="languageChart" hasn't been created yet because of innerHTML in script.js
  // if we put it at start of the chart.js, we wouldn't know what languageChart is
  const ctx_languages = document.getElementById('languagesChart');
  const data_2 = {
    labels: ['HTML', 'CSS', 'Javascript'],
    datasets: [
      {
        label: 'Language use (percentage)',
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
        borderWidth: 2,
      },
    ],
  };

  const stackedBar = new Chart(ctx_languages, {
    type: 'bar',
    data: data_2,
    options: {
      scales: {
        y: {
          beginAtZero: true,
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
