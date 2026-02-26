import {
  formatDate,
  formatCurrency,
  getCategoryColor,
} from "../../utils/utils";

export default function ExpenseTableRow({ expense }) {
  const categoryColor = getCategoryColor(expense.category);

  return (
    <tr>
      <td className="text-muted">{formatDate(expense.createdAt)}</td>
      <td className="fw-medium">{expense.description || "N/A"}</td>
      <td>
        <span
          className="px-3 py-2 rounded"
          style={{
            backgroundColor: categoryColor,
            color: "white",
            border: "none",
            display: "inline-block",
            fontSize: "0.875rem",
            fontWeight: "500",
          }}
        >
          {expense.category || "Other"}
        </span>
      </td>
      <td className="text-end fw-bold ">{formatCurrency(expense.sum)}</td>
    </tr>
  );
}
