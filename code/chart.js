//DOM-selector for the canvas 👇
const reposChart = document.getElementById('reposChart').getContext('2d')
//"Draw" the chart here 👇


// what's not working below is commented out
// global options
Chart.defaults.font.family = 'Roboto'
Chart.defaults.font.size = 18
Chart.defaults.color = 'white'

const drawReposChart = (amount) => {
    new Chart(reposChart, {
        type: 'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data: {
            labels: ['Done', 'To do'],
            datasets: [{
                // label: 'Projects',
                data: [
                    amount,
                    19 - amount
                ],
                backgroundColor: [
                    '#DBE2EF',
                    '#3F72AF'
                ]
            }
            ]
        },
        options: {
            indexAxis: 'y', // for horizontal bar graph instead of vertical
            scales: {
                // grid lines are not shown for y axis
                y: {
                    grid: {
                        display: false,
                        borderColor: 'white',
                    }
                },
                // x axis is not shown
                x: {
                    display: false,
                }
            },
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
                        fontColor: '#112D4E'
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
                    backgroundColor: '#F9F7F7',
                    bodyColor: '#112D4E',
                    titleColor: '#112D4E',
                    titleAlign: 'center',
                    bodyAlign: 'center',
                    titleFont: {
                        weight: '700'
                    },
                    bodyFont: {
                        weight: '700'
                    },
                    cornerRadius: 4,
                    displayColors: false
                }
            }
        }
    })
}


// const titleTooltip = (tooltipItems) => {
//     return 'Test'
// }
// const labelTooltip = ()

const drawLanguagesChart = (html, css, js, idChart) => {

    const languagesChart = document.getElementById(idChart).getContext('2d')


    new Chart(languagesChart, {
        type: 'polarArea', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
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
                    display: false // removes vertical numbers
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
                    // removes on click event: not able to strike through a label by clicking on it
                    onClick: null,
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
                    enabled: false,
                    backgroundColor: '#F9F7F7',
                    bodyColor: '#112D4E',
                    titleColor: '#112D4E',
                    bodyFont: {
                        weight: '700'
                    },
                    cornerRadius: 4
                }
            }
        }
    })
}


