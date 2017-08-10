import { h, render } from 'preact';

import EmployeeCard from 'Components/EmployeeCard.jsx';

render((
    <main id="fagdag-pwa">
        <EmployeeCard name="Jonas Lundeland" />
    </main>
), document.getElementById('app-container'));
