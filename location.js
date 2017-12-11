const axios = require('axios');

const url = 'https://www.cabanias.com.ar/villa-gesell/cabanas/caobaypiedra';

async function getData(url) {
  // console.log(url);

  let result = '';

  try {
    const response = await axios.get(url);
    result = response.data;
  } catch (ex) {
    result = ex;
    console.log(ex);
  }

  return result;
}


async function test() {
  const data = await getData(url);

  const pattern = /gps:"[^"]+/;

  const result = pattern.exec(data)[0];

  const clean = result.replace('gps:"', '');

  const [lat, long] = clean.split(',');

  console.log(lat);
  console.log(long);
}

test();

