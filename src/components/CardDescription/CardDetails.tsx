import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCharacterAsync } from '../../store/features/characterSlice';
import { AppDispatch, RootState } from '../../store/store';
import { ICharacter } from '../../lib/definitions';

import './styles.css';
import Loader from '../Loader/Loader';

const CardDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cardID } = useParams<{ cardID: string }>();
  const { character, loading, error } = useSelector(
    (state: RootState) => state.character
  );

  useEffect(() => {
    if (cardID) {
      dispatch(fetchCharacterAsync(cardID));
    }
  }, [dispatch, cardID]);

  if (loading) {
    return (
      <div className="card-details">
        <Loader />
      </div>
    );
  }

  if (error || !character) {
    return <div>Error loading character details.</div>;
  }

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
  } = character.results[0] as ICharacter;

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
