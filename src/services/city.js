import axios from 'axios';

export const getAll = input =>
  axios.get('/api/cities', { params: { input } })
    .then(response => response.data.map(elem => ({ value: elem.id, label: elem.name })))
    .catch((error) => {
      console.log(error);
    });


export const getCity = slug =>
  axios.get(`http://localhost:3000/api/city/${slug}`)
    .then(response => response.data[0])
    .catch((error) => {
      console.log(error);
    });
