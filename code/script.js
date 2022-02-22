
fetch('https://api.github.com/users/ariallahyar/repos', token)
  .then((response) => {
      return response.json();
  })
  .then((data) => {
      // do something
      console.log(data);
  })
  .catch((error) => {
      console.log(error);
  })