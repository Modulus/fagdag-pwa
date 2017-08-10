import request from 'superagent';
require('superagent-as-promised')(request);

const API_URL = 'https://sonat-fagdag-pwa.firebaseio.com/employees.json';

export const getEmployees = () =>
  request
  .get(API_URL)
    .then(response => response.body)
    .catch((err) => {
        console.error('Feilet ved henting av ansatt-data', err);
        return [];
    });

export default {
  getEmployees
};
