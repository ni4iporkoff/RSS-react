import { Component } from 'react';
import './App.css';
import Cards from './components/Cards/Cards';
import Search from './components/Search/Search';
import { IData } from './lib/definitions';
import { fetchCharacters, fetchSearchCharacters } from './lib/data';
import Loader from './components/Loader/Loader';
import PlugText from './components/PlugText/PlugText';
import './App.css';

interface IAppState {
  data: IData | null;
  loading: boolean;
  searchValue: string | null;
  error: boolean;
}

class App extends Component<Record<string, never>, IAppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      searchValue: localStorage.getItem('searchValue'),
      error: false,
    };
  }

  componentDidMount = async () => {
    let data: IData;

    try {
      if (this.state.searchValue) {
        data = await fetchSearchCharacters(this.state.searchValue);
      } else {
        data = await fetchCharacters();
      }

      this.setState({
        data,
        loading: false,
      });
    } catch (error) {
      this.setState({ error: true });
    }
  };

  handleSearch = async (searchedValue: string) => {
    this.setState({ loading: true });

    try {
      const searchedData = await fetchSearchCharacters(searchedValue);
      this.setState({ loading: false, data: searchedData });
    } catch (error) {
      this.setState({ error: true });
      throw error;
    }
  };

  generateError = () => {
    this.setState({ error: true });
  };

  render() {
    const { data, error } = this.state;
    const fetchedData = data?.results || [];

    if (error) throw new Error('Error in App');

    return (
      <>
        <header className="header">
          <Search handleSearch={this.handleSearch} />
          <button onClick={this.generateError} className="error-btn">
            Click for generate error
          </button>
        </header>
        <main>
          {this.state.loading && <Loader />}
          {fetchedData.length === 0 && !this.state.loading ? (
            <PlugText
              text={'Unfortunately, we haven`t found anything for you'}
            />
          ) : (
            <Cards fetchedData={fetchedData} />
          )}
        </main>
      </>
    );
  }
}

export default App;
