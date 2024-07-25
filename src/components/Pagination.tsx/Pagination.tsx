import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

interface IPaginationProps {
  currentPage: number;
  handlePage: (page: number) => void;
  pageQty: number;
}

const Pagination = ({ currentPage, handlePage, pageQty }: IPaginationProps) => {
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(pageQty, startPage + 4);

    const pagesArray = [];
    for (let i = startPage; i <= endPage; i++) {
      pagesArray.push(i);
    }

    setPages(pagesArray);
  }, [currentPage, pageQty]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pageQty) {
      handlePage(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      <ul className="pages">
        {pages.map((page) => (
          <li
            key={page}
            className={`page ${currentPage === page ? 'active-page' : ''}`}
            onClick={() => handlePage(page)}
          >
            <Link to={`?page=${page}`}>{page}</Link>
          </li>
        ))}
      </ul>

      <button
        className="pagination-btn"
        onClick={handleNextPage}
        disabled={currentPage === pageQty}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
