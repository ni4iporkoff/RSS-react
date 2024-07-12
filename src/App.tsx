import { useEffect, useState } from 'react';
import './App.css';
import Cards from './components/Cards/Cards';
import Search from './components/Search/Search';
import { IData } from './lib/definitions';
import { fetchCharacters, fetchSearchCharacters } from './lib/data';
import Loader from './components/Loader/Loader';
import PlugText from './components/PlugText/PlugText';
import './App.css';

const App = () => {
  const [data, setData] = useState<IData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const searchValue = localStorage.getItem('searchValue') || '';

  useEffect(() => {
    let data: IData;
    const fetchData = async () => {
      try {
        if (searchValue) {
          data = await fetchSearchCharacters(searchValue);
        } else {
          data = await fetchCharacters();
        }

        setData(data);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchData();
  }, [searchValue]);

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
      </main>
    </>
  );
};

export default App;
