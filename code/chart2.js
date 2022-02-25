//DOM-selector for sprint chart
const sprint = document.getElementById('sprintChart')

// Date Consts (In Epoch - Milliseconds)
const feb21 = 1645401600000
const feb28 = 1646006400000
const mar7 = 1646611200000
const mar14 = 1647216000000
const mar21 = 1647820800000
const mar28 = 1648425600000
const apr4 = 1649030400000
const apr11 = 1649635200000
const apr18 = 1650240000000
const apr25 = 1650844800000
const may2 = 1651449600000
const may9 = 1652054400000
const may16 = 1652659200000
const may23 = 1653264000000
const may30 = 1653868800000
const jun6 = 1654473600000
const jun13 = 1655078400000
const jun20 = 1655683200000

// Let declarations
let sprint1
let sprint2
let sprint3
let sprint4
let sprint5
let sprint6
let colors = []
let now = Date.now()

// Function for determining date & setting sprint data and colors on bar chart
const dataColors = () => {
    // If statements for sprints
    if (now > feb21 && now < feb28) {
        sprint1 = 4;
        sprint2 = 3;
        sprint3 = 0;
        sprint4 = 0;
        sprint5 = 0;
        sprint6 = 0;
        colors = ['#2d2e2f', '#DCD8DC', '#DCD8DC', '#DCD8DC', '#DCD8DC', '#DCD8DC']
    } if (now > feb28 && now < mar7) {
        sprint1 = 4;
        sprint2 = 4;
        sprint3 = 0;
        sprint4 = 0;
        sprint5 = 0;
        sprint6 = 0;
        colors = ['#2d2e2f', '#2d2e2f', '#DCD8DC', '#DCD8DC', '#DCD8DC', '#DCD8DC']
    } if (now > mar7 && now < mar14) {
        sprint1 = 4;
        sprint2 = 4;
        sprint3 = 1;
        sprint4 = 0;
        sprint5 = 0;
        sprint6 = 0;
        colors = ['#2d2e2f', '#2d2e2f', '#DCD8DC', '#DCD8DC', '#DCD8DC', '#DCD8DC']     
    } if (now > mar14 && now < mar21) {
        sprint1 = 4;
        sprint2 = 4;
        sprint3 = 2;
        sprint4 = 0;
        sprint5 = 0;
        sprint6 = 0;
        colors = ['#2d2e2f', '#2d2e2f', '#DCD8DC', '#DCD8DC', '#DCD8DC', '#DCD8DC']   
    } if (now > mar21 && now < mar28) {
        sprint1 = 4;
        sprint2 = 4;
        sprint3 = 3;
        sprint4 = 0;
        sprint5 = 0;
        sprint6 = 0;
        colors = ['#2d2e2f', '#2d2e2f', '#DCD8DC', '#DCD8DC', '#DCD8DC', '#DCD8DC']
    } if (now > mar28 && now < apr4) {
        sprint1 = 4;
        sprint2 = 4;
        sprint3 = 4;
        sprint4 = 0;
        sprint5 = 0;
        sprint6 = 0;
        colors = ['#2d2e2f', '#2d2e2f', '#2d2e2f', '#DCD8DC', '#DCD8DC', '#DCD8DC']
    } if (now > apr4 && now < apr11) {
        sprint1 = 4;
        sprint2 = 4;
        sprint3 = 4;
        sprint4 = 1;
        sprint5 = 0;
        sprint6 = 0;
        colors = ['#2d2e2f', '#2d2e2f', '#2d2e2f', '#DCD8DC', '#DCD8DC', '#DCD8DC']
    } if (now > apr11 && now < apr18) {
        sprint1 = 4;
        sprint2 = 4;
        sprint3 = 4;
        sprint4 = 2;
        sprint5 = 0;
        sprint6 = 0;
        colors = ['#2d2e2f', '#2d2e2f', '#2d2e2f', '#DCD8DC', '#DCD8DC', '#DCD8DC']      
    } if (now > apr18 && now < apr25) {
        sprint1 = 4;
        sprint2 = 4;
        sprint3 = 4;
        sprint4 = 3;
        sprint5 = 0;
        sprint6 = 0;
        colors = ['#2d2e2f', '#2d2e2f', '#2d2e2f', '#DCD8DC', '#DCD8DC', '#DCD8DC']
    } if (now > apr25 && now < may2) {
        sprint1 = 4;
        sprint2 = 4;
        sprint3 = 4;
        sprint4 = 4;
        sprint5 = 0;
        sprint6 = 0;
        colors = ['#2d2e2f', '#2d2e2f', '#2d2e2f', '#2d2e2f', '#DCD8DC', '#DCD8DC']
    } if (now > may2 && now < may9) {
        sprint1 = 4;
        sprint2 = 4;
        sprint3 = 4;
        sprint4 = 4;
        sprint5 = 1;
        sprint6 = 0;
        colors = ['#2d2e2f', '#2d2e2f', '#2d2e2f', '#2d2e2f', '#DCD8DC', '#DCD8DC']
    } if (now > may9 && now < may16) {
        sprint1 = 4;
        sprint2 = 4;
        sprint3 = 4;
        sprint4 = 4;
        sprint5 = 2;
        sprint6 = 0;
        colors = ['#2d2e2f', '#2d2e2f', '#2d2e2f', '#2d2e2f', '#DCD8DC', '#DCD8DC']
    } if (now > may16 && now < may23) {
        sprint1 = 4;
        sprint2 = 4;
        sprint3 = 4;
        sprint4 = 4;
        sprint5 = 3;
        sprint6 = 0;
        colors = ['#2d2e2f', '#2d2e2f', '#2d2e2f', '#2d2e2f', '#DCD8DC', '#DCD8DC']
    } if (now > may23 && now < may30) {
        sprint1 = 4;
        sprint2 = 4;
        sprint3 = 4;
        sprint4 = 4;
        sprint5 = 4;
        sprint6 = 0;
        colors = ['#2d2e2f', '#2d2e2f', '#2d2e2f', '#2d2e2f', '#2d2e2f', '#DCD8DC']
    } if (now > may30 && now < jun6) {
        sprint1 = 4;
        sprint2 = 4;
        sprint3 = 4;
        sprint4 = 4;
        sprint5 = 4;
        sprint6 = 1;
        colors = ['#2d2e2f', '#2d2e2f', '#2d2e2f', '#2d2e2f', '#2d2e2f', '#DCD8DC']
    } if (now > jun6 && now < jun13) {
        sprint1 = 4;
        sprint2 = 4;
        sprint3 = 4;
        sprint4 = 4;
        sprint5 = 4;
        sprint6 = 2;
        colors = ['#2d2e2f', '#2d2e2f', '#2d2e2f', '#2d2e2f', '#2d2e2f', '#DCD8DC']
    } if (now > jun13 && now < jun20) {
        sprint1 = 4;
        sprint2 = 4;
        sprint3 = 4;
        sprint4 = 4;
        sprint5 = 4;
        sprint6 = 3;
        colors = ['#2d2e2f', '#2d2e2f', '#2d2e2f', '#2d2e2f', '#2d2e2f', '#DCD8DC']
    } else if (now > jun20) {
        sprint1 = 4;
        sprint2 = 4;
        sprint3 = 4;
        sprint4 = 4;
        sprint5 = 4;
        sprint6 = 4;
        colors = ['#2d2e2f', '#2d2e2f', '#2d2e2f', '#2d2e2f', '#2d2e2f', '#2d2e2f']
    }
}

//Chart function
const sprintProgress = () => {
    
    // Run dataColors for determining sprint progress
    dataColors();

    const data = {
        labels: [
            'Sprint 1',
            'Sprint 2',
            'Sprint 3',
            'Sprint 4',
            'Sprint 5',
            'Sprint 6'
        ],
        datasets: [{
            data: [sprint1, sprint2, sprint3, sprint4, sprint5, sprint6],
            backgroundColor: colors,
            hoverOffset: 8,
            hoverBorderColor: [
                '#FFFFFF'
            ],
            // xAxisID = 'xAxis'
        }]
    };
    
    const config = {
        type: 'bar',
        data: data,
        options: {
            indexAxis: 'y',
            // xAxisID: 'Weeks',
            plugins: {
                legend: {
                    display: false,
                    position: 'top',
                },
            scales: {
                xAxis: {
                    ticks: {
                        precision: 0,
                        // stepSize: 1,
                    }
                }
            }
            }
        }
    };
    
    const sprintChart = new Chart(
        sprint,
        config,
    );
}

sprintProgress();