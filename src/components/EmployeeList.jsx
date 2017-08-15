import { h, render, Component } from 'preact';
import { getEmployees } from 'Services/employee-service';
import EmployeeCard from 'Components/EmployeeCard.jsx';

class EmployeeList extends Component {

  constructor() {
    super();
    this.state = {
      employees: []
    };
  }

  componentDidMount() {
    getEmployees().then(employees =>
      this.setState({
        employees
      }));
  }

  render() {
    return (
      <main className="container">
        <ul className="employee-list">
          {
            this.state.employees.map(employee =>
              <EmployeeCard {...employee} />
            )
          }
        </ul>
      </main>
    );
  }
}

export default EmployeeList;
