import { h, render } from 'preact';
import EmployeeList from 'Components/EmployeeList.jsx';

render((
  <main>
    <EmployeeList />
  </main>), document.getElementById('app-container'));
