//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')
 
const drawChart = (doneProjects) => {

	//config for the the doughnut-chart:
	const config = {
			type: 'doughnut',
			data: {
					labels: [
							'Finished Projects',
							'Projects left'
					],
					datasets: [{
							label: 'My First Dataset',
							data: [doneProjects, totalProjects - doneProjects],
							backgroundColor: [
							'rgb(120, 129, 131)',
							'rgb(198, 207, 215)',
							],
							hoverOffset: 2
					}]
			},
		};

	//rendering the chart in the browser/ newChart(where to put it, what to put)
	const chart = new Chart(ctx, config);
}