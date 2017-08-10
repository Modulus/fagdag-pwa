import { h, render } from 'preact';

const EmployeeCard = ({ name }) =>
  <div className="employee-card">
      <span>{name}</span>
  </div>

export default EmployeeCard;
