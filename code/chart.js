//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d');

//"Draw" the chart here 👇
const drawPieChart = (pullReqData) => {
	const { total, done } = pullReqData;
	const data = {
		labels: ['Done', 'Soon'],
		datasets: [
			{
				label: 'Technigo project progress',
				data: [done, total - done],
				backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 205, 86)'],
				hoverOffset: 4,
			},
		],
	};

	const config = {
		type: 'pie',
		data: data,
	};

	new Chart(ctx, config);
};
