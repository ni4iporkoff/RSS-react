import React from 'react';
import './styles.css';

interface IPlugTextProps {
  text: string;
}

const PlugText = ({ text }: IPlugTextProps) => {
  return (
    <div className="plug">
      <p>{text}</p>
    </div>
  );
};

export default PlugText;
