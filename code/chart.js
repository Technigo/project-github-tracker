// Global Font Family for Chart
Chart.defaults.font.family = 'Roboto Mono, monospace';

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
                    position: 'top',
                    labels: {
                        font: {
                            size: 16,
                        },
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
