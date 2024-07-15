import React from 'react';
import './styles.css';

interface IPaginationProps {
  page: number;
  handleNextPage: () => void;
  handlePrevPage: () => void;
}

const Pagination = ({
  page,
  handleNextPage,
  handlePrevPage,
}: IPaginationProps) => {
  return (
    <div className="pagination">
      <button onClick={handlePrevPage}>Prev</button>
      <div className="page">{page}</div>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
};

export default Pagination;
