import { Link } from 'preact-router/match';
import { h, render } from 'preact';

const firstname = name =>
  name.split(' ')[0];

const EmployeeCard = ({ id, name, image, mobile, email, status }) =>
  <div className="card brown darken-3">
    <div className="card-content white-text">
      <span className="card-title">{ name }</span>
      <p>{ status || `${ firstname(name) } har ikkje lagt ut status endå. 🤐` }</p>
    </div>
    <div className="card-action">
      <a href={ `tel:${ mobile }` }>Ring</a>
      <a href={ `mailto:${ email }`}>Send e-post</a>
      <Link href={ `/status/${id}` }>Oppdater status</Link>
    </div>
  </div>;

export default EmployeeCard;
