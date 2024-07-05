import { Component } from 'react';
import Card from '../Card/Card';
import './styles.css';
import { ICharacter } from '../../lib/definitions';

export default class Cards extends Component<{ fetchedData: ICharacter[] }> {
  render() {
    const charaters = this.props.fetchedData;

    return (
      <ul className="cards">
        {charaters.map((charater) => {
          return (
            <li key={charater.name}>
              <Card charater={charater} />
            </li>
          );
        })}
      </ul>
    );
  }
}
