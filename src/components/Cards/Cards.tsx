import Card from '../Card/Card';
import './styles.css';
import { ICharacter } from '../../lib/definitions';

interface ICardsProps {
  fetchedData: ICharacter[];
}

const Cards = ({ fetchedData }: ICardsProps) => {
  const characters = fetchedData;

  return (
    <ul className="cards">
      {characters.map((character: ICharacter) => {
        return (
          <li key={character.name}>
            <Card character={character} />
          </li>
        );
      })}
    </ul>
  );
};

export default Cards;
