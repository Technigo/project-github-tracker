//DOM-selector for the canvas 👇
const ctx = document.getElementById('myChart').getContext('2d')
Chart.defaults.font.family = 'Roboto Mono, monospace';


//"Draw" the chart here 👇



const drawChart = (numberOfProjects) => {
    const config = {
        type: "pie",
        data: {
        labels: ["Project done", "Project left"],
        datasets:[{
        label: "Technigo Projects",
        data: [numberOfProjects, 19 - numberOfProjects],
        backgroundColor:["rgb(0,0,250)", "rgb(27,27,119)"],
        hoverOffset: 4,

        }]

        }
    }

    const myChart = new Chart(ctx, config);

}
