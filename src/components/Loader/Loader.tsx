import React from 'react';
import circles from '../../assets/bouncing-circles.svg';
import './styles.css';

const Loader = () => {
  return (
    <div className="loader">
      <img src={circles} width={100} height={100} alt="Loading..." />
    </div>
  );
};

export default Loader;
