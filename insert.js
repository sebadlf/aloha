// import db from './db';

const fs = require('fs');

const data = fs.readFileSync('./locations.json');
const json = JSON.parse(data);

console.log(json);

