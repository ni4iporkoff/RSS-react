import React from 'react';
import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, Outlet } from 'react-router-dom';

import Cards from './components/Cards/Cards';
import Search from './components/Search/Search';
import Pagination from './components/Pagination.tsx/Pagination';
import Loader from './components/Loader/Loader';
import PlugText from './components/PlugText/PlugText';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCharactersAsync,
  fetchSearchCharactersAsync,
  selectCharacters,
  setError,
} from './store/features/charactersSlice';
import { AppDispatch } from './store/store';

import './App.css';

interface ICharactersLoaderData {
  initialPage: string | undefined;
}

const App = () => {
  const { initialPage } = useLoaderData() as ICharactersLoaderData;

  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error, pageQty } = useSelector(selectCharacters);

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(Number(initialPage) || 1);

  const searchValue = localStorage.getItem('searchValue') || '';

  useEffect(() => {
    if (searchValue) {
      dispatch(fetchSearchCharactersAsync(searchValue));
    } else {
      dispatch(fetchCharactersAsync(currentPage.toString()));
    }
  }, [dispatch, currentPage, searchValue]);

  const handleSearch = (searchedValue: string) => {
    dispatch(fetchSearchCharactersAsync(searchedValue));
  };

  const generateError = () => {
    dispatch(setError(true));
  };

  const fetchedData = data?.results || [];
  if (error) throw new Error('Error in App');

  const handlePage = (page: number) => {
    if (page < 1 || page > pageQty) return;
    navigate(`?page=${page}`);
    setCurrentPage(page);
    dispatch(fetchCharactersAsync(page.toString()));
  };

  return (
    <>
      <header className="header">
        <Search handleSearch={handleSearch} />
        <button onClick={generateError} className="error-btn">
          Click to generate error
        </button>
      </header>
      <main className="main">
        {fetchedData.length === 0 && !loading ? (
          <PlugText text={'Unfortunately, we haven`t found anything for you'} />
        ) : (
          <section className="content">
            <div className="cards-content">
              {loading ? <Loader /> : <Cards fetchedData={fetchedData} />}
            </div>
            <div className="outlet-content">
              <Outlet />
            </div>
          </section>
        )}
        <Pagination
          currentPage={currentPage}
          handlePage={handlePage}
          pageQty={pageQty}
        />
      </main>
    </>
  );
};

export default App;
