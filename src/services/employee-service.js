import request from 'superagent';
require('superagent-as-promised')(request);

const API_BASE_URL = 'https://sonat-fagdag-pwa.firebaseio.com';

const sortAlphabetically = employees =>
  employees.sort((a, b) => {
    if(a.name < b.name) return -1;
    if(a.name > b.name) return 1;
    return 0;
  });

const assignId = employees =>
  employees.map((employee, id) =>
    ({ ...employee, id }));

export const getEmployees = () =>
  request
  .get(`${API_BASE_URL}/employees.json`)
    .then(response => response.body)
    .then(assignId)
    .then(sortAlphabetically)
    .catch((err) => {
        console.error('Feilet ved henting av liste med ansatt-data', err);
        return [];
    });

export const getEmployee = id =>
  request
  .get(`${API_BASE_URL}/employees/${id}.json`)
    .then(response => response.body)
    .catch((err) => {
        console.error('Feilet ved henting av ansatt-data', err);
        return [];
    });

export const updateEmployeeStatus = (id, status) =>
  request
  .patch(`${API_BASE_URL}/employees/${id}.json`)
    .set('Content-Type', 'application/json')
    .send(JSON.stringify({ status }))
    .catch((err) => {
        console.error('Feilet ved oppdatering av ansatt-status', err);
    });

export default {
  getEmployees,
  getEmployee,
  updateEmployeeStatus,
};
