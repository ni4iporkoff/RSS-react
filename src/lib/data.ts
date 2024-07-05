import { IData } from './definitions';

export const fetchCharacters = async () => {
  const response = await fetch(`https://swapi.dev/api/people`);

  if (!response.ok) throw new Error('Could not fetch charaters');

  const data: IData = await response.json();
  return data;
};
