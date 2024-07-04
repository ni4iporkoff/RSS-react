import { Component } from 'react';
import Card from '../Card/Card';
import { fetchPokemons } from '../../lib/data';
import { IData } from '../../lib/definitions';
import './styles.css';

interface ICardsState {
  data: IData | null;
  loading: boolean;
}

export default class Cards extends Component<
  Record<string, never>,
  ICardsState
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      data: null,
      loading: true,
    };
  }

  async componentDidMount() {
    const data = await fetchPokemons();
    this.setState({
      data,
      loading: false,
    });
  }

  render() {
    const { data, loading } = this.state;

    const pokemons = data?.results;
    if (loading) {
      return <div>Loading...</div>;
    }

    if (!data || !pokemons) {
      return <div>No data available</div>;
    }

    return (
      <ul className="cards">
        {pokemons.map((pokemon) => {
          return (
            <li key={pokemon.name}>
              <Card pokemon={pokemon} />
            </li>
          );
        })}
      </ul>
    );
  }
}
