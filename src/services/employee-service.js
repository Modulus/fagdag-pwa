import request from 'superagent';
require('superagent-as-promised')(request);

const API_URL = 'https://sonat-fagdag-pwa.firebaseio.com/employees.json';

const sortAlphabetically = employees =>
  employees.sort((a, b) => {
    if(a.name < b.name) return -1;
    if(a.name > b.name) return 1;
    return 0;
  });

export const getEmployees = () =>
  request
  .get(API_URL)
    .then(response => response.body)
    .then(sortAlphabetically)
    .catch((err) => {
        console.error('Feilet ved henting av ansatt-data', err);
        return [];
    });

export default {
  getEmployees
};
