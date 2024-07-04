import { Component } from 'react';
import { IPokemon, IPokemonAbility, IPokemonStat } from '../../lib/definitions';
import { fetchPokemon } from '../../lib/data';
import './styles.css';

export interface IPokemonState {
  id: number | null;
  abilities: IPokemonAbility[] | null;
  height: number | null;
  name: string | null;
  stats: IPokemonStat[] | null;
  weight: number | null;
}

export default class Card extends Component<
  { pokemon: IPokemon },
  IPokemonState
> {
  constructor(props: { pokemon: IPokemon }) {
    super(props);
    this.state = {
      id: null,
      abilities: null,
      height: null,
      name: null,
      stats: null,
      weight: null,
    };
  }

  async componentDidMount() {
    const pokemonData = await fetchPokemon(this.props.pokemon.url);
    this.setState({ ...pokemonData });
  }

  render() {
    const { name, abilities, height } = this.state;
    return (
      <div className="card">
        <div className="card-name">Name: {name}</div>
        <div className="card-name">Height: {height}</div>
        <ul className="abilities">
          Abilities:
          {abilities
            ? abilities?.map((ability: IPokemonAbility) => {
                return (
                  <li key={ability.ability.name} className="abilities-item">
                    - {ability.ability.name}
                  </li>
                );
              })
            : 'No pokemon data'}
        </ul>
      </div>
    );
  }
}
