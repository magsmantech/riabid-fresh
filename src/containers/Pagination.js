import React from "react";

export default function Pagination({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
  hasViewAll = false,
  viewAllFn
}) {
  let pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  pageNumbers =
    currentPage > 5
      ? pageNumbers.slice(currentPage - 3, currentPage + 3)
      : pageNumbers.slice(0, 5);
  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <button
            onClick={() =>
              currentPage > 1
                ? paginate(currentPage - 1)
                : paginate(currentPage)
            }
            className="page-link prevButton"
          >
            <span className='previous'></span><span className="pageText">Previous</span>
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            {currentPage == number ? (
              <button
                onClick={() => paginate(number)}
                className="page-link active"
              >
                {number}
              </button>
            ) : (
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            )}
          </li>
        ))}

        <li className="page-item">
          <button
            onClick={() => paginate(currentPage + 1)}
            className="page-link nextButton"
          ><span className="pageText">Next</span>
            <span className="next"></span>
          </button>
        </li>
        {
          hasViewAll ? (
            <li className="page-item">
              <button
                onClick={viewAllFn}
                className="page-link viewAll"
              >
                View All
              </button>
            </li>
          ) : null
        }
      </ul>
    </nav>
  );
}
