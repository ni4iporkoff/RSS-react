import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { ICharacter, IData } from '../../lib/definitions';
import './styles.css';

const CardDetails = () => {
  const { results } = useLoaderData() as IData;

  const {
    name,
    height,
    mass,
    hair_color,
    eye_color,
    birth_year,
    gender,
    films,
    vehicles,
  } = results[0] as ICharacter;

  return (
    <div className="card-details">
      <p>Name: {name}</p>
      <p>Height: {height}</p>
      <p>Mass: {mass}</p>
      <p>Hair color: {hair_color}</p>
      <p>Eye color: {eye_color}</p>
      <p>Birth year: {birth_year}</p>
      <p>Gender: {gender}</p>
      <p>Films: {films?.length}</p>
      <p>Vehicles: {vehicles?.length}</p>
    </div>
  );
};

export default CardDetails;
