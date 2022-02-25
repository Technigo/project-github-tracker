//DOM-selector
const ctx = document.getElementById('myChart')

//Drawing the doughnut chart
const completedProjects = (complete) => {
    const data = {
        labels: [
            `Completed Projects`,
            `Incomplete Projects`,
        ],
        // Pulls complete from script.js
        datasets: [{
            data: [complete, (19 - complete)],
            backgroundColor: [
            '#2d2e2f',
            '#DCD8DC'
            ],
            hoverOffset: 8,
            hoverBorderColor: [
                '#FFFFFF'
            ]
        }]
    };
    
    const config = {
        type: 'doughnut',
        data: data,
        options: {
            plugins: {
                legend: {
                    // display: false,
                    position: 'top',
                    // align: 'start',
                    labels: {
                        font: {
                            family: 'Roboto Mono, monospace',
                            size: 16,
                        },
                        // padding: 20
                    }
                },
            }
        }
    };
    
    const myChart = new Chart(
        ctx,
        config,
    );
}
