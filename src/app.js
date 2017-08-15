import Router from 'preact-router';
import { h, render } from 'preact';

import EmployeeList from 'Components/EmployeeList.jsx';
import Status from 'Components/Status.jsx';

const App = () => (
	<Router>
		<EmployeeList path="/" />
		<Status path="/status/:id" />
	</Router>
);

render(<App />, document.getElementById('app-container'));
