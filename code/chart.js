//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')

//"Draw" the chart here 👇
const drawChart = (forkedRepos) => {

    const labels = [
        'Completed Projects',
        'Remaining Projects',
    ];

    const data = {
        labels: labels,
        datasets: [{
            label: 'My first dataset',
            backgroundColor: ['#655D8A', '#D885A3'],
            borderColor: '#FDCEB9',
            borderWidth: 6,
            data: [forkedRepos, 19-forkedRepos],
        }]
    };

    const config = {
        type: 'pie',
        data: data,
        options: {}
    };

    const myChart = new Chart(
        document.getElementById('chart'),
        config
    );
}