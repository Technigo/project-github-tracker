//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')
const technigoProjects = 19


//"Draw" the chart here 👇
const myChart = (repos) => {
new Chart(ctx, {
  type: 'doughnut',
  data: {
      labels: ['Projects I will do during bootcamp', 'Projects I have done during this bootcamp'],
      datasets: [{
          label: '# of Votes',
          data: [technigoProjects - repos.length,
            repos.length,],
          backgroundColor: [
            'rgba(46, 204, 113, 0.2)',
            'rgba(34,139,34, 0.5)'
          ],
          borderColor: [
              'rgba(38, 166, 91, 1)',
              'rgba(0,100,0, 1)'
          ],
          borderWidth: 1
      }]
  },
 
})
};