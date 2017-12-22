const axios = require('axios');

const url = 'http://www.anatolia.com.ar/';

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

  console.log(data);

  const pattern = /[A-Za-z0-9._-]+@[A-Za-z0-9._-]+\.[A-Za-z.]{2,3}/;

  const result = pattern.exec(data)[0];

  console.log(result);
}

test();

