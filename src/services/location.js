import axios from 'axios';

export const getLocation = slug =>
  axios.get(`http://localhost:3000/api/location/${slug}`)
    .then(response => response.data[0])
    .catch((error) => {
      console.log(error);
    });
