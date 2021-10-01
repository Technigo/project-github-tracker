const ctx = document.getElementById('chart').getContext('2d')




const drawChart = (number) => {
    const config = {
      type: 'doughnut',
      data: {
        labels: ["Projects done", "Still to do"],
        datasets: [
          {
            label: "My first Dataset", 
            data: [number, 20 - number], // divide donut to 2 different parts
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
            ],
            hoverOffset:4,
          },
        ],
      },
    }
    const myChart = new Chart(ctx, config);
  };



  // const showLanguages = (amountHTML, amountCSS, amountJS) => {
  //   const config2 = {
  //     type: 'doughnut',
  //     data: {
  //       labels: ["HTML", "CSS", "JavaScript"],
  //       datasets: [
  //         {
  //           label: "My first Dataset", 
  //           data: [amountHTML, amountCSS, amountJS], 
  //           backgroundColor: [
  //             "rgb(255, 99, 132)",
  //             "rgb(54, 162, 235)",
  //             "rgb(0, 0, 0)"
  //           ],
  //           hoverOffset:4,
  //         },
  //       ],
  //     },
  //   }
  //   const myChart = new Chart(ctx2, config2);
  // }
