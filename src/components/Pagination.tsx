interface PaginationProps {
  gotoNextPage: () => void;
  gotoPrevPage: () => void;
}

export default function Pagination({
  gotoNextPage,
  gotoPrevPage,
}: PaginationProps) {
  return (
    <div>
      <button onClick={gotoPrevPage}>Previous</button>
      <button onClick={gotoNextPage}>Next</button>
    </div>
  );
}
