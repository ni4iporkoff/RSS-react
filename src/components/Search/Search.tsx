import { ChangeEvent, Component, FormEvent } from 'react';
import './styles.css';

interface ISearchState {
  inputValue: string;
}

export default class Search extends Component<
  Record<string, never>,
  ISearchState
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('searchInputValue', this.state.inputValue);
  };

  render() {
    const { inputValue } = this.state;

    return (
      <header>
        <form onSubmit={this.handleFormSubmit} className="search">
          <input
            type="text"
            placeholder="Search pokemon..."
            value={inputValue}
            onChange={this.handleInput}
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
