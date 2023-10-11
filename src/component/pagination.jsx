import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ pageCount, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
    onPageChange(selected.selected);
  };

  return (
    <ReactPaginate
      previousLabel={'이전'}
      nextLabel={'다음'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageChange}
      containerClassName={'pagination'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
      forcePage={currentPage}
    />
  );
};

export default Pagination;
