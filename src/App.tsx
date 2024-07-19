import { useEffect, useState } from 'react';
import './App.css';
import Cards from './components/Cards/Cards';
import Search from './components/Search/Search';
import { IData } from './lib/definitions';
import { fetchCharacters, fetchSearchCharacters } from './lib/data';
import Loader from './components/Loader/Loader';
import PlugText from './components/PlugText/PlugText';
import './App.css';
import React from 'react';
import Pagination from './components/Pagination.tsx/Pagination';
import { useLoaderData, useNavigate } from 'react-router-dom';

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
    let data: IData;
    const fetchData = async () => {
      try {
        if (searchValue) {
          data = await fetchSearchCharacters(searchValue);
        } else {
          data = charactersData;
        }

        setData(data);
        setPageQty(Math.ceil(data.count / CHARACTER_PER_PAGE));
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchData();
  }, [charactersData, searchValue]);

  const handleSearch = async (searchedValue: string) => {
    setLoading(true);

    try {
      const searchedData = await fetchSearchCharacters(searchedValue);
      setData(searchedData);
      setLoading(false);
    } catch (error) {
      setError(true);
      throw error;
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
      <main>
        {loading && <Loader />}
        {fetchedData.length === 0 && !loading ? (
          <PlugText text={'Unfortunately, we haven`t found anything for you'} />
        ) : (
          <Cards fetchedData={fetchedData} />
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
