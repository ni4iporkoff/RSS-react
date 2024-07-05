import { Component } from 'react';

import './styles.css';
import { ICharacter } from '../../lib/definitions';

export default class Card extends Component<{ charater: ICharacter }> {
  render() {
    const { name, height, mass } = this.props.charater;
    return (
      <div className="card">
        <div className="card-item">Name: {name}</div>
        <div className="card-item">Height: {height}</div>
        <div className="card-item">Weight: {mass}</div>
      </div>
    );
  }
}
