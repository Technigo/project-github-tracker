const counterDiv = document.querySelector('projectCounter');


Chart.defaults.font.family = 'Miriam Libre, sans-serif';
Chart.defaults.font.size = 12;

const drawCounter = (finishedProjects) => {

  counterDiv.innerHTML += `Finished projects: ${finishedProjects} <br> Projects to go: ${19-finishedProjects}`

}

//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇
const drawChart = (finishedProjects) => {


  const data = {
    labels: ['Finished','Unfinished'],
    datasets: [{
      label: 'My First dataset',
      backgroundColor: [
        '#211d31d2',
                         '#FFFFFF',
                         ],

      borderWidth: '0',
      data: [finishedProjects, 19-finishedProjects],
    }]
  };

  const config = {
    type: 'pie',
  data: data,
  options: {
      plugins: {

        legend: {
        display: false
        },
    },
    responsive: true,
    
    }
  
  };
  
  const myChart = new Chart( ctx, config );

}
