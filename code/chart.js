//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇

const drawBarChart = (repos) => {
	// Sandwich analogy for .map() - this time, I asked to do something with each sandwich.
	// I said "for each sandwich let's take only the bread from it and prepare bread bait for fishing".
	// So, for each sandwich, we throw away all content from insid (ham, cheese etc.) and use bread to prepare bait.
	// We end up with a bag of bread baits.
	// Same goes for this code implementation - for each repo object we iterate through, we only take the name property and size property.
	// So, we end up with array of names and array of sizes that we can use as labels and data for charts!
	const labels = repos.map((repo) => repo.name);
	const data = repos.map((repo) => repo.size);

	new Chart(ctx, {
		type: 'pie',
		data: {
			labels,
			datasets: [
				{
					data,
					backgroundColor: ['#d5a7b6', '#5c7fe9'],
				},
			],
		},
	});
};
