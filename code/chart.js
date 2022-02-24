const showChart = (countRepos) => {


  const ctx = document.getElementById('chart').getContext('2d');

  const labels = [
      `Finished projects`,
      `Projects left`
    ];

  const data = {
      labels: labels,
      datasets: [{
        label: 'My Technigo projects',
        backgroundColor: ['rgb(245, 217, 237)', 'rgb(217, 245, 239)'],
        borderColor: 'rgb(66, 66, 66)',
        data: [countRepos, 19-countRepos],
      }]
    };


  const config = {
      type: 'pie',
      data: data,
      options: {}
    };

    const myChart = new Chart(ctx, config);
}