//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

const labels = [
  'Projects completed',
  'Projects left',
];

const data = {
  labels: labels,
  datasets: [{
    label: 'My First Dataset',
    data: [6, 13],
    backgroundColor: [
      "peachpuff", 
      "darkseagreen"
      
    ],
    hoverOffset: 4
  }]
};



const configuration = {
  type: 'pie',
  data: data,
  options: {}
  
};

const myChart = new Chart(
  ctx,
  configuration
);


