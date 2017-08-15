import Match from 'preact-router/match';
import { h, render, Component } from 'preact';
import { getEmployee, updateEmployeeStatus } from 'Services/employee-service';
import EmployeeCard from 'Components/EmployeeCard.jsx';

class Status extends Component {

  constructor() {
    super();
    this.state = {
      employee: null
    };
  }

  componentDidMount() {
    getEmployee(this.props.id).then(employee =>
      this.setState({
        employee
      }));
  }

  handleSubmit(e) {
    e.preventDefault();
    updateEmployeeStatus(this.props.id, this.textarea.value)
      .then(() => console.log('Ok!'));
  }

  render() {
    if(!this.state.employee)
      return null;

    return (
      <main className="container">
        <h1>Oppdater status</h1>
        <h2>{this.state.employee.name}</h2>
        <form className="col s12" onSubmit={this.handleSubmit.bind(this)}>
          <div className="row">
            <div className="input-field col s12">
              <textarea id="status-update-textarea" ref={(textarea) => { this.textarea = textarea; }}></textarea>
            </div>
            <div className="col s2 offset-s10">
              <input type="submit" value="Send"></input>
            </div>
          </div>
        </form>
      </main>
    );
  }
}

export default Status;
