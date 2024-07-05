import { ChangeEvent, Component, FormEvent } from 'react';
import './styles.css';

interface ISearchProps {
  handleSearch: (searchedValue: string) => void;
}

interface ISearchState {
  inputValue: string;
}

export default class Search extends Component<ISearchProps, ISearchState> {
  constructor(props: ISearchProps) {
    super(props);
    this.state = {
      inputValue: localStorage.getItem('searchValue') || '',
    };
  }

  handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.handleSearch(this.state.inputValue);
    localStorage.setItem('searchValue', this.state.inputValue);
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
