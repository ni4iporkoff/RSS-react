import { IPokemonData } from './definitions';

export const fetchPokemons = async () => {
  const limit = 12;
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}`
  );

  if (!response.ok) throw new Error('Could not fetch pokemons');

  const data = await response.json();
  return data;
};

export const fetchPokemon = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) throw new Error('Could not fetch choosen pokemon');

  const data = await response.json();

  const pokemonData: IPokemonData = {
    id: data.id,
    abilities: data.abilities,
    height: data.height,
    name: data.name,
    stats: data.stats,
    weight: data.weight,
  };

  return pokemonData;
};
