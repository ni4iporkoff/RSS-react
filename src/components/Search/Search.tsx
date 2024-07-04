import { Component } from 'react';
import './styles.css';

export default class Search extends Component {
  render() {
    return (
      <header>
        <form className="search">
          <input
            type="text"
            placeholder="Search pokemon..."
            className="search-input"
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>
      </header>
    );
  }
}
