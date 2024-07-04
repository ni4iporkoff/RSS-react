export interface IData {
  count: number;
  next: string;
  previous: string;
  results: IPokemon[];
}

export interface IPokemon {
  name: string;
  url: string;
}

export interface IPokemonData {
  id: number;
  abilities: IPokemonAbility[];
  height: number;
  name: string;
  stats: IPokemonStat[];
  weight: number;
}

export interface IPokemonAbility {
  ability: { name: string; url: string };
  is_hidden: boolean;
  slot: number;
}

export interface IPokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}
