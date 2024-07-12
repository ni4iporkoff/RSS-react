import { ChangeEvent, FormEvent, useState } from 'react';
import './styles.css';

interface ISearchProps {
  handleSearch: (searchedValue: string) => void;
}

const Search = ({ handleSearch }: ISearchProps) => {
  const [inputValue, setInputValue] = useState<string>(
    localStorage.getItem('searchValue') || ''
  );

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(inputValue);
    localStorage.setItem('searchValue', inputValue);
  };

  return (
    <header>
      <form onSubmit={handleFormSubmit} className="search">
        <input
          type="text"
          placeholder="Search pokemon..."
          value={inputValue}
          onChange={handleInput}
          className="search-input"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
    </header>
  );
};

export default Search;
