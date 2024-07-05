import { Component } from 'react';
import './App.css';
import Cards from './components/Cards/Cards';
import Search from './components/Search/Search';
import { IData } from './lib/definitions';
import { fetchCharacters, fetchSearchCharacters } from './lib/data';
import Loader from './components/Loader/Loader';
import PlugText from './components/PlugText/PlugText';

interface IAppState {
  data: IData | null;
  loading: boolean;
  searchValue: string | null;
}

class App extends Component<Record<string, never>, IAppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      searchValue: localStorage.getItem('searchValue'),
    };
  }

  componentDidMount = async () => {
    let data: IData;
    if (this.state.searchValue) {
      data = await fetchSearchCharacters(this.state.searchValue);
    } else {
      data = await fetchCharacters();
    }

    this.setState({
      data,
      loading: false,
    });
  };

  handleSearch = async (searchedValue: string) => {
    this.setState({ loading: true });
    const searchedData = await fetchSearchCharacters(searchedValue);
    this.setState({ loading: false, data: searchedData });
  };

  render() {
    const { data } = this.state;
    const fetchedData = data?.results || [];

    return (
      <>
        <Search handleSearch={this.handleSearch} />
        {this.state.loading && <Loader />}
        {fetchedData.length === 0 && !this.state.loading ? (
          <PlugText text={'Unfortunately, we haven`t found anything for you'} />
        ) : (
          <Cards fetchedData={fetchedData} />
        )}
      </>
    );
  }
}

export default App;
