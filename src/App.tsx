import { Component } from 'react';
import './App.css';
import Cards from './components/Cards/Cards';
import Search from './components/Search/Search';
import { IData } from './lib/definitions';
import { fetchCharacters } from './lib/data';

interface IAppState {
  data: IData | null;
  loading: boolean;
}

class App extends Component<Record<string, never>, IAppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      data: null,
      loading: true,
    };
  }

  async componentDidMount() {
    const data: IData = await fetchCharacters();

    this.setState({
      data,
      loading: false,
    });
  }

  render() {
    const { data } = this.state;
    const fetchedData = data?.results || [];

    return (
      <>
        <Search />
        <Cards fetchedData={fetchedData} />
      </>
    );
  }
}

export default App;
