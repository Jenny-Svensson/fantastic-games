interface PaginationProps {
  gotoNextPage: () => void;
  gotoPrevPage: () => void;
}

export default function Pagination({
  gotoNextPage,
  gotoPrevPage,
}: PaginationProps) {
  return (
    <div className="pagination-container">
      <button onClick={gotoPrevPage}>
        <span className="material-symbols-outlined">arrow_back_ios_new</span>
      </button>
      <button onClick={gotoNextPage}>
        <span className="material-symbols-outlined">arrow_forward_ios</span>
      </button>
    </div>
  );
}
