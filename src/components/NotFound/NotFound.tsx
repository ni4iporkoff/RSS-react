import { Link } from 'react-router-dom';
import './styles.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="not-found-link">
        Return to main page
      </Link>
    </div>
  );
};

export default NotFound;
