import { ChangeEvent, Component, FormEvent } from 'react';
import './styles.css';
import { IData } from '../../lib/definitions';
import { fetchSearchCharacters } from '../../lib/data';

interface ISearchProps {
  handleData: (data: IData) => void;
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

  handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchedData = await fetchSearchCharacters(this.state.inputValue);
    this.props.handleData(searchedData);
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
