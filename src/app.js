import Router from 'preact-router';
import { h, render } from 'preact';

import EmployeeList from 'Components/EmployeeList.jsx';
import Status from 'Components/Status.jsx';

const App = () => (
	<Router>
		<EmployeeList path="/fagdag-pwa/" />
		<Status path="/fagdag-pwa/status/:id" />
	</Router>
);

render(<App />, document.getElementById('app-container'));
