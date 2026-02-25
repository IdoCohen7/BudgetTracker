import { Card, Badge } from "react-bootstrap";
import {
  formatDate,
  formatCurrency,
  getCategoryColor,
} from "../../utils/utils";

export default function ExpenseCard({ expense }) {
  return (
    <Card className="border-0 border-bottom rounded-0">
      <Card.Body className="py-3">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div className="flex-grow-1">
            <h6 className="mb-1 fw-bold">{expense.description || "N/A"}</h6>
            <small className="text-muted">
              {formatDate(expense.createdAt)}
            </small>
          </div>
          <h5 className="mb-0 text-danger fw-bold ms-3">
            {formatCurrency(expense.sum)}
          </h5>
        </div>
        <Badge bg={getCategoryColor(expense.category)} className="px-3 py-1">
          {expense.category || "Other"}
        </Badge>
      </Card.Body>
    </Card>
  );
}
