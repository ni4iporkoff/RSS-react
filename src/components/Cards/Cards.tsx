import React from 'react';
import Card from '../Card/Card';
import './styles.css';
import { ICharacter } from '../../lib/definitions';
import { Link, useLocation } from 'react-router-dom';

interface ICardsProps {
  fetchedData: ICharacter[];
}

const Cards = ({ fetchedData }: ICardsProps) => {
  const characters = fetchedData;
  const location = useLocation();
  const currentPage = new URLSearchParams(location.search).get('page') || 1;

  return (
    <ul className="cards">
      {characters.map((character: ICharacter) => {
        return (
          <li key={character.name}>
            <Link to={`cards/${character.name}?page=${currentPage}`}>
              <Card character={character} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Cards;
