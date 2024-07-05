import { Component } from 'react';
import './styles.css';

interface PlugTextProps {
  text: string;
}

export default class PlugText extends Component<PlugTextProps> {
  render() {
    return (
      <div className="plug">
        <p>{this.props.text}</p>
      </div>
    );
  }
}
