
const labels = [
    'Completed projects', 'Total projects'
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'Projects',
      backgroundColor: ['rgb(76, 81, 105)', 'rgb(13, 18, 46)'],
      data: [5, 20],
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
        maintainAspectRatio: false,
    }

  };

  const myChart = new Chart(
    document.getElementById('chart'),
    config
  );