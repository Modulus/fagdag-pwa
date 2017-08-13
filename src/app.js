import { h, render } from 'preact';
import EmployeeList from 'Components/EmployeeList.jsx';

render((
  <main className="container">
    <EmployeeList />
  </main>), document.getElementById('app-container'));
