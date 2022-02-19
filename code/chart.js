//DOM-selector for the canvas 👇
const projectsChart = document.getElementById('projectsChart').getContext('2d')
//"Draw" the chart here 👇


// what's not working below is commented out
// global options
Chart.defaults.font.family = 'Lato';
Chart.defaults.font.size = 18;
Chart.defaults.color = 'blue';


const drawProjectsChart = (amount) => {
    new Chart(projectsChart, {
        type: 'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data: {
            labels: ['Completed', 'To do'],
            datasets: [{
                // label: 'Projects',
                data: [
                    amount,
                    19 - amount
                ],
                backgroundColor: [
                    'red',
                    'green'
                ],
                borderWidth: 2,
                borderColor: 'black',
                hoverBorderWidth: 5,
                hoverBorderColor: 'brown'
            }
            ]
        },
        options: {
            indexAxis: 'y', // for horizontal bar graph instead of vertical
            plugins: {
                title: {
                    display: true,
                    text: 'Projects',
                    fontSize: 24
                },
                legend: {
                    display: false,
                    position: 'top',
                    labels: {
                        fontColor: 'red'
                    }
                },
                layout: {
                    padding: {
                        left: 50,
                        right: 0,
                        bottom: 0,
                        top: 0
                    }
                },
                tooltip: {
                    enabled: true
                }
            }
        }
    })
}


const drawLanguagesChart = (htmlPercentage, cssPercentage, jsPercentage, idChart) => {

    const languagesChart = document.getElementById(idChart).getContext('2d')


    new Chart(languagesChart, {
        type: 'pie', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data: {
            labels: ['HTML', 'CSS', 'JavaScript'],
            datasets: [{
                label: 'Languages', // où cela apparaît-il??
                data: [
                    htmlPercentage,
                    cssPercentage,
                    jsPercentage
                ],
                backgroundColor: [
                    'red',
                    'green',
                    'yellow'
                ],
                borderWidth: 2,
                borderColor: 'black',
                hoverBorderWidth: 5,
                hoverBorderColor: 'brown'
            }
            ]
        },
        options: {
            plugins: {
                title: {
                    display: false,
                    text: 'Languages',
                    fontSize: 24
                },
                legend: {
                    display: false,
                    position: 'top',
                    labels: {
                        fontColor: 'red'
                    }
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0
                    }
                },
                tooltip: {
                    enabled: true
                }
            }
        }
    })
}


