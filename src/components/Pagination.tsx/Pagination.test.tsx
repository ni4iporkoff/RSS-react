import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, test, expect, vi } from 'vitest';
import Pagination from './Pagination';

const renderPagination = (
  currentPage: number,
  pageQty: number,
  handlePage = vi.fn()
) => {
  render(
    <MemoryRouter>
      <Pagination
        currentPage={currentPage}
        handlePage={handlePage}
        pageQty={pageQty}
      />
    </MemoryRouter>
  );
};

describe('Pagination Component', () => {
  test('displays correct pages based on current page and total pages', () => {
    const currentPage = 3;
    const pageQty = 10;

    renderPagination(currentPage, pageQty);

    [1, 2, 3, 4, 5].forEach((page) => {
      expect(screen.getByText(page.toString())).toBeInTheDocument();
    });

    [0, 6, 8, 10, 11].forEach((page) => {
      expect(screen.queryByText(page.toString())).not.toBeInTheDocument();
    });
  });

  test('handles Prev and Next buttons correctly', () => {
    const handlePage = vi.fn();
    const currentPage = 3;
    const pageQty = 10;

    renderPagination(currentPage, pageQty, handlePage);

    fireEvent.click(screen.getByText('Prev'));
    expect(handlePage).toHaveBeenCalledWith(2);

    fireEvent.click(screen.getByText('Next'));
    expect(handlePage).toHaveBeenCalledWith(4);
  });

  test('disables Prev button on the first page', () => {
    const currentPage = 1;
    const pageQty = 10;

    renderPagination(currentPage, pageQty);

    expect(screen.getByText('Prev')).toBeDisabled();
  });

  test('disables Next button on the last page', () => {
    const currentPage = 10;
    const pageQty = 10;

    renderPagination(currentPage, pageQty);

    expect(screen.getByText('Next')).toBeDisabled();
  });

  test('highlights the active page', () => {
    const currentPage = 3;
    const pageQty = 10;

    renderPagination(currentPage, pageQty);

    const activePage = screen.getByText('3');
    const parentLi = activePage.closest('li');
    expect(parentLi).toHaveClass('active-page');
  });

  test('handles single page correctly', () => {
    const handlePage = vi.fn();

    renderPagination(1, 1, handlePage);

    expect(screen.queryByText('Prev')).toBeDisabled();
    expect(screen.queryByText('Next')).toBeDisabled();
    expect(screen.queryByText('1')).toBeInTheDocument();
  });

  test('calls handlePage with correct page number on page click', () => {
    const handlePage = vi.fn();
    const currentPage = 3;
    const pageQty = 10;

    renderPagination(currentPage, pageQty, handlePage);

    fireEvent.click(screen.getByText('4'));
    expect(handlePage).toHaveBeenCalledWith(4);

    fireEvent.click(screen.getByText('2'));
    expect(handlePage).toHaveBeenCalledWith(2);
  });
});
