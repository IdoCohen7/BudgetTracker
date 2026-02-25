import { Badge } from "react-bootstrap";
import {
  formatDate,
  formatCurrency,
  getCategoryColor,
} from "../../utils/utils";

export default function ExpenseTableRow({ expense }) {
  return (
    <tr>
      <td className="text-muted">{formatDate(expense.createdAt)}</td>
      <td className="fw-medium">{expense.description || "N/A"}</td>
      <td>
        <Badge bg={getCategoryColor(expense.category)} className="px-3 py-2">
          {expense.category || "Other"}
        </Badge>
      </td>
      <td className="text-end fw-bold text-danger">
        {formatCurrency(expense.sum)}
      </td>
    </tr>
  );
}
