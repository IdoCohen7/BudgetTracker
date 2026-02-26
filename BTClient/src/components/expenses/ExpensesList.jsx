import { Table, Button, Spinner } from "react-bootstrap";
import ExpenseTableRow from "./ExpenseTableRow";
import ExpenseCard from "./ExpenseCard";
import { useEffect, useRef } from "react";

export default function ExpensesList({
  expenses,
  hasMore,
  onLoadMore,
  loading,
}) {
  const observerTarget = useRef(null);

  // infinite scroll mechanism
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          onLoadMore();
        }
      },
      { threshold: 0.1 },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading, onLoadMore]);

  if (expenses?.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted mb-0">No expenses found</p>
        <small className="text-muted">
          Start tracking your expenses to see them here
        </small>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table View */}
      <div className="d-none d-md-block table-responsive">
        <Table hover className="mb-0">
          <thead className="table-light">
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th className="text-end">Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses?.map((expense, index) => (
              <ExpenseTableRow key={expense.id || index} expense={expense} />
            ))}
          </tbody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="d-md-none">
        {expenses?.map((expense, index) => (
          <ExpenseCard key={expense.id || index} expense={expense} />
        ))}
      </div>

      {/* Loading indicator at the bottom */}
      {loading && expenses?.length > 0 && (
        <div className="text-center py-4">
          <Spinner animation="border" variant="primary" size="sm" />
          <span className="ms-2 text-muted">Loading more...</span>
        </div>
      )}

      {/* Intersection observer target for infinite scroll */}
      {hasMore && !loading && (
        <div ref={observerTarget} style={{ height: "20px" }} />
      )}

      {/* Load more button as fallback */}
      {hasMore && !loading && expenses?.length > 0 && (
        <div className="text-center py-3 border-top">
          <Button variant="outline-primary" onClick={onLoadMore}>
            Load More Expenses
          </Button>
        </div>
      )}

      {/* End of list message */}
      {!hasMore && expenses?.length > 0 && (
        <div className="text-center py-3 text-muted border-top">
          <small>You've reached the end of your expenses</small>
        </div>
      )}
    </>
  );
}
