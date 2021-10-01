//DOM-selector for the canvas 👇
const ctx = document.getElementById("chart").getContext("2d");

Chart.defaults.font.size = 26;
const drawChart = () => {
	const config = {
		type: "doughnut",
		data: {
			labels: ["Finished projects", "projects left"],
			datasets: [
				{
					label: "My First Dataset",

					data: [5, 20 - 5],

					backgroundColor: ["rgba(86, 114, 85, 1)", "rgb(86, 114, 85, 0.7)"],

					hoverOffset: 4,
				},
			],
		},
	};

	const myChart = new Chart(ctx, config);
};
