const reposChart = document.getElementById('reposChart').getContext('2d')

// global options for chart.js
Chart.defaults.font.family = 'Roboto'
Chart.defaults.font.size = 24
Chart.defaults.color = 'white'

const drawReposChart = (amount) => {
    new Chart(reposChart, {
        type: 'bar',
        data: {
            labels: ['Done', 'To do'],
            datasets: [{
                data: [
                    amount,
                    19 - amount
                ],
                backgroundColor: [
                    '#DBE2EF',
                    '#3F72AF'
                ]
            }]
        },
        options: {
            indexAxis: 'y', // for horizontal bar graph instead of vertical
            scales: {
                y: {
                    grid: {
                        display: false, // removes grid lines for y axis
                        borderColor: 'white',
                    }
                },
                x: {
                    display: false, // removes x axis
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Technigo projects',
                },
                legend: {
                    display: false,
                },
                tooltip: {
                    backgroundColor: '#F9F7F7',
                    bodyColor: '#112D4E',
                    titleColor: '#112D4E',
                    titleAlign: 'center',
                    bodyAlign: 'center',
                    titleFont: {
                        size: 12,
                        weight: '700'
                    },
                    bodyFont: {
                        size: 12,
                        weight: '700'
                    },
                    cornerRadius: 2,
                    displayColors: false
                }
            }
        }
    })
}

const drawLanguagesChart = (html, css, js, idChart) => {
    const languagesChart = document.getElementById(idChart).getContext('2d')
    new Chart(languagesChart, {
        type: 'polarArea',
        data: {
            labels: ['HTML', 'CSS', 'JS'],
            datasets: [{
                data: [
                    html,
                    css,
                    js
                ],
                backgroundColor: [
                    '#DBE2EF',
                    '#3F72AF',
                    '#112D4E'
                ]
            }
            ]
        },
        options: {
            scales: {
                r: {
                    ticks: {
                        display: false, // removes vertical numbers
                        // callback added because there is an issue with ticks, link: https://github.com/chartjs/Chart.js/issues/8092
                        callback: function (val, index) {
                            return val
                        },
                    },
                    grid: {
                        display: false // removes circular lines
                    }
                }
            },
            plugins: {
                title: {
                    display: false
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: '#112D4E',
                        usePointStyle: true,
                        pointStyle: 'rect',
                        font: {
                            size: 12
                        }
                    },
                    onClick: null, // removes on click event: not possible to strike through a label by clicking on it
                },
                tooltip: {
                    enabled: false,
                }
            }
        }
    })
}