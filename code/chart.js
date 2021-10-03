//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d');

//"Draw" the chart here 👇

const pieData = {
	labels: ['Projects to go', 'Projects done'],
	datasets: [
		{
			label: 'Technigo project progress',
			data: [19, 0],
			backgroundColor: ['RGB(22, 27, 33)', 'RGB(37, 166, 65)'],
			borderColor: '#21262c',
			hoverOffset: 4,
		},
	],
};

const pieConfig = {
	type: 'doughnut',
	data: pieData,
};

const pieChart = new Chart(ctx, pieConfig);

const updatePieChart = (chart, newData) => {
	chart.data.datasets.forEach((dataset) => {
		dataset.data.pop();
		dataset.data.push(newData);
	});
	chart.update();
};

// const lineData = {
// 	// labels: ['Soon', 'Done'],
// 	datasets: [
// 		{
// 			label: 'Technigo project progress',
// 			data: [19, 0],
// 			backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 205, 86)'],
// 			hoverOffset: 4,
// 		},
// 	],
// };

// const lineConfig = {
// 	type: 'line',
// 	data: lineData,
// };

// let lineChart = (ctx) => new Chart(ctx, lineConfig);
