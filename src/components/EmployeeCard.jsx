import { Link } from 'preact-router/match';
import { h, render } from 'preact';
import classnames from 'classnames';

const firstname = name =>
  name.split(' ')[0];

const EmployeeCard = ({ id, name, image, mobile, email, status, onClick, activeId }) =>
  <div className={classnames('card', { 'card--active': id === activeId })}>
    <div onClick={ e => onClick(e, id) }>
      <img src={ image } />
      <div className="card-title">
        <a href="#" className="toggle-info btn">
          <span className="left"></span>
          <span className="right"></span>
        </a>
        <h2>
            { name }
        </h2>
      </div>
    </div>
    <div className="card-flap flap1">
      <div className="card-description">
        {
          status || `${ firstname(name) } har ikke lagt ut status enda.`
        }
      </div>
      <div className="card-flap flap2">
        <div className="card-actions">
          { mobile ? <a className="btn" href={ `tel:${ mobile }` }>Ring</a> : null }
          { email ? <a className="btn" href={ `mailto:${ email }`}>Send e-post</a> : null }
          <Link className="btn" href={ `/status/${id}` }>Oppdater status</Link>
        </div>
      </div>
    </div>
  </div>;

export default EmployeeCard;
