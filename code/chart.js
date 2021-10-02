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
                    'rgba(223, 198, 124, 1)',
                    'rgba(63, 111, 166, 1)',
                ],
                borderColor: [
                    'rgba(223, 198, 104, 1)',
                    'rgba(63, 111, 144, 1)',
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





