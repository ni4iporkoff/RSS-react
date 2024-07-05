import { Component } from 'react';
import './App.css';
import Cards from './components/Cards/Cards';
import Search from './components/Search/Search';
import { IData } from './lib/definitions';
import { fetchCharacters, fetchSearchCharacters } from './lib/data';

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

  handleData = (data: IData) => {
    this.setState({ data });
  };

  render() {
    const { data } = this.state;
    const fetchedData = data?.results || [];

    return (
      <>
        <Search handleData={this.handleData} />
        {this.state.loading ? (
          'Loading...'
        ) : (
          <Cards fetchedData={fetchedData} />
        )}
      </>
    );
  }
}

export default App;
