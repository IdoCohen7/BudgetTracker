import { Table } from "react-bootstrap";
import ExpenseTableRow from "./ExpenseTableRow";
import ExpenseCard from "./ExpenseCard";

export default function ExpensesList({ expenses }) {
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
    </>
  );
}
