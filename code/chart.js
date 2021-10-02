//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d');

//"Draw" the chart here 👇

const pieData = {
	// labels: ['Soon', 'Done'],
	datasets: [
		{
			label: 'Technigo project progress',
			data: [19, 0],
			backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 205, 86)'],
			hoverOffset: 4,
		},
	],
};

const pieConfig = {
	type: 'pie',
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
