//DOM-selector for the canvas 

//Chart showing completed and remaining projects

const drawChart = (numberOfProjects) => {
    const ctx = document.getElementById('chart').getContext('2d')
    const config = {
        type: "pie",
        data: {
        labels: ["Projects completed", "Projects remaining"],
        datasets:[{
        label: "Technigo Projects",
        data: [numberOfProjects, 19 - numberOfProjects],
        backgroundColor:["rgb(255,255,255)", "rgb(102,153,153)"],
        hoverOffset: 4,
        }]
        }
    }

const chart = new Chart(document.getElementById('chart'),
config);

}