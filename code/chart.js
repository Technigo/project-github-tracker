//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇

const drawChart = (ammount) => {
    const config = {
        type: "doughnut",
        data: {
            labels: [
                "My completed projects", "Projects left"
            ], 
            datasets: [
                {
                    label: "Dataset",
                    data: [ammount, 19-ammount], 
                    backgroundColor: ["rgb(255, 99, 132)", "rgb(100, 06, 130)"],
                    borderColor: "rgb(255, 98, 133)",
                }
            ]
        }
    }
    const myChart = new Chart(
        document.getElementById('chart'),
        config
      );
}




  