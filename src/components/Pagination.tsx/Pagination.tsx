import React, { useEffect, useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

interface IPaginationProps {
  currentPage: number;
  handlePage: (arg: number) => void;
  pageQty: number;
}

const Pagination = ({ currentPage, handlePage, pageQty }: IPaginationProps) => {
  const [renderedPages, setRenderedPages] = useState<number[]>([]);
  const [startPosition, setStartPosition] = useState(1);

  useEffect(() => {
    renderPages();
  }, [startPosition]);

  const renderPages = () => {
    const pagesNumbers: number[] = [];
    const lastPosition = startPosition + 5;

    for (let i = startPosition; i < lastPosition; i++) {
      if (
        renderedPages[renderedPages.length - 1] >= pageQty ||
        startPosition < 1
      )
        return;
      pagesNumbers.push(i);
    }

    setRenderedPages(() => pagesNumbers);
  };

  const handlePrevPage = (position: number) => {
    handlePage(position);

    if (currentPage < renderedPages[2]) {
      setStartPosition(() => startPosition - 1);
    }
  };

  const handleNextPage = (position: number) => {
    handlePage(position);

    if (currentPage > renderedPages[2]) {
      setStartPosition(() => startPosition + 1);
    }
  };

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={() => handlePrevPage(currentPage - 1)}
      >
        Prev
      </button>

      <ul className="pages">
        {renderedPages.map((page) => {
          let className = 'page';
          if (currentPage === page) className = 'page active-page';

          return (
            <li
              key={page}
              className={className}
              onClick={() => handlePage(page)}
            >
              <Link to={`?page=${page}`}>{page}</Link>
            </li>
          );
        })}
      </ul>

      <button
        className="pagination-btn"
        onClick={() => handleNextPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
