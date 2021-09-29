//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇



// const drawChart = (amount) => {
//     const config = {
//         type: 'doughnut',
//         data: {
//             labels: [
//                 'HTML',
//                 'CSS',
//                 'JavaScript'
//             ],
//             datasets: [{
//                 label: 'My First Dataset',
//                 data: [amount, 20 - amount],
//                 backgroundColor: [
//                     'rgb(255, 99, 132)',
//                     'rgb(54, 162, 235)',
//                     'rgb(54, 180, 235)',
//                 ],
//                 hoverOffset: 4
//             }]
//         },
//     };
//     const myChart = new Chart(ctx, config);

// }


const drawChartforRepo = (languages, element) => {
    const config = {
        type: 'doughnut',
        data: {
            labels: Object.keys(languages),
            datasets: [{
                label: '# Frecuencies Words',
                data: Object.keys(languages).map(function (key) { return languages[key]; }),
                borderWidth: 1
            }]
        }
    };
    return new Chart(element, config);

}



