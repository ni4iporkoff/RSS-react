import './styles.css';
import { ICharacter } from '../../lib/definitions';

interface ICardProps {
  character: ICharacter;
}

const Card = ({ character }: ICardProps) => {
  const { name, height, mass } = character;

  return (
    <div className="card">
      <div className="card-item">Name: {name}</div>
      <div className="card-item">Height: {height}</div>
      <div className="card-item">Weight: {mass}</div>
    </div>
  );
};

export default Card;
