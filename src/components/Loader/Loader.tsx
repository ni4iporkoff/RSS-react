import spinner from '../../assets/gears-spinner.svg';
import './styles.css';

const Loader = () => {
  return (
    <div className="loader">
      <img src={spinner} width={100} height={100} alt="Loading..." />
    </div>
  );
};

export default Loader;
