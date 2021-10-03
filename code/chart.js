//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇
//console.log('hey from chart')




 // const myChart = new Chart(document.getElementById('myChart'),config);
 //amount of repos
 const drawChart =(amount) =>{
 
 const config = {
    type: 'doughnut',
    data:
    { labels: [
        'Finished Projects',
        'Projects Left',
        
      ],
      datasets: [{
        label: 'Technigo projects',
        //data: [300, 50, 100], //[5,20-5] 1st:length of repoarray, 2nd: all projects need to do + length ofRepoArray
        data: [amount,19-amount],
        backgroundColor: [
          '#CEE5D0', 'rgb(46, 12, 124);'
        ],
        hoverOffset: 4
      }]
  },
};
const myChart = new Chart(ctx,config);
}
