//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d');

//"Draw" the chart here 👇
const drawChart = (repos) => {
	const labels = ["Projects completed", "Projects to go"];
	const data = [repos.length, 19-repos.length];

	new Chart(ctx, {
		type: "doughnut",
		data: {
			labels,
			datasets: [
				{
					data,
					backgroundColor: ['#0b293f', '#459ec6'],
				},
			],
		},
        options: {
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Technigo Bootcamp Projects",
              },
            },
          }
	});
};

