import React from 'react';
import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, Outlet } from 'react-router-dom';

import Cards from './components/Cards/Cards';
import Search from './components/Search/Search';
import Pagination from './components/Pagination.tsx/Pagination';
import Loader from './components/Loader/Loader';
import PlugText from './components/PlugText/PlugText';

import { fetchCharacters, fetchSearchCharacters } from './lib/data';
import { IData } from './lib/definitions';
import './App.css';

interface ICharactersLoaderData {
  charactersData: IData;
  initialPage: string | undefined;
}

const App = () => {
  const { charactersData, initialPage } =
    useLoaderData() as ICharactersLoaderData;

  const navigate = useNavigate();

  const [data, setData] = useState<IData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [currentPage, setCurrentPage] = useState(Number(initialPage) || 1);
  const [pageQty, setPageQty] = useState(0);
  const CHARACTER_PER_PAGE = 10;

  const searchValue = localStorage.getItem('searchValue') || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = searchValue
          ? await fetchSearchCharacters(searchValue)
          : charactersData;
        setData(data);
        setPageQty(Math.ceil(data.count / CHARACTER_PER_PAGE));
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [charactersData, searchValue]);

  const handleSearch = async (searchedValue: string) => {
    setLoading(true);

    try {
      const searchedData = await fetchSearchCharacters(searchedValue);
      setData(searchedData);
    } catch (error) {
      console.error('Error during search:', error);
      setError(true);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const generateError = () => {
    setError(true);
  };

  const fetchedData = data?.results || [];
  if (error) throw new Error('Error in App');

  const handlePage = async (page: number) => {
    if (page < 1 || page > pageQty) return;
    navigate(`?page=${page}`);

    setCurrentPage(() => page);
    const pageData = await fetchCharacters(page.toString());
    setData(pageData);
  };

  return (
    <>
      <header className="header">
        <Search handleSearch={handleSearch} />
        <button onClick={generateError} className="error-btn">
          Click for generate error
        </button>
      </header>
      <main className="main">
        {loading && <Loader />}
        {fetchedData.length === 0 && !loading ? (
          <PlugText text={'Unfortunately, we haven`t found anything for you'} />
        ) : (
          <section className="details">
            <Cards fetchedData={fetchedData} />
            <Outlet />
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
