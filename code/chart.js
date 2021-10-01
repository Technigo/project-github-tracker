//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇
const drawChart = (numberOfFinishedProjects) => {
    config = {
        type: 'pie',
        data: {
            labels: ['Finished Projects', 'Projects Left'],
            datasets: [{
                label: 'Technigo Projects',
                data: [numberOfFinishedProjects, 20 - numberOfFinishedProjects],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: "Comparison Technigo Course Finished projects vs Projects left",
                    position: 'top',
                    padding: {
                        top: 10,
                        bottom: 20
                    }
                }
            }

        }

    }
    const myChart = new Chart(ctx, config);
}





