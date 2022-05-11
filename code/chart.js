//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

// Global options
Chart.defaults.font.family = 'Manrope, sans-serif';
Chart.defaults.font.size = 25;


// Function for creating the chart
const drawChart = (doneProjects) => { 

    //"Draw" the chart here 👇
    const config = {
        type: 'doughnut',
        data: {
            labels: ['Projects done', 'Projects left to do'],
            datasets: [{
                label: 'Technigo Bootcamp 2022',
                data: [
                    doneProjects,
                    19 - doneProjects,
                ],
                backgroundColor: [
                    '#D1ADCC',
                    '#F6E9D7',
                ],
                borderWidth: 1,
                borderColor: '#F6E9D7',
                hoverBorderWidth: 3,
                hoverBorderColor: '#D1ADCC',
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        boxWidth: 20,
                        color: '',
                        color: '#5F2C3E',
                        padding: 30,
                        maxHeight: 30,

                    },
                },
                title: {
                    display: true,
                    text: 'Bootcamp Progress',
                    color: '#5F2C3E',
                    font: {
                        size: 32,
                    },
                    padding: {
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 30,
                    },
                },
            },
            // tooltips: {
            //     enabled: false,
            // },
        }
    }
    const myChart = new Chart(document.getElementById('chart'), config)
}

    

   
