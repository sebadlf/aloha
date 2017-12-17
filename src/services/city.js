import axios from 'axios';

export const getAll = input =>
  axios.get('/api/cities', { params: { input } })
    .then(response => response.data.map(elem => ({ value: elem.id, label: elem.name })))
    .catch((error) => {
      console.log(error);
    });

