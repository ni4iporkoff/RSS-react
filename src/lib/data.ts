import { IData } from './definitions';

export const fetchCharacters = async () => {
  const response = await fetch(`https://swapi.dev/api/people`);

  if (!response.ok) throw new Error('Could not fetch charaters');

  const data: IData = await response.json();
  return data;
};

export const fetchSearchCharacters = async (charater: string) => {
  const response = await fetch(
    `https://swapi.dev/api/people/?search=${charater}`
  );

  if (!response.ok) throw new Error('Could not fetch searched charaters');

  const data: IData = await response.json();
  return data;
};
