import { Component } from 'react';
import spinner from '../../assets/gears-spinner.svg';
import './styles.css';

export default class Loader extends Component {
  render() {
    return (
      <div className="loader">
        <img src={spinner} width={100} height={100} alt="Loading..." />
      </div>
    );
  }
}
