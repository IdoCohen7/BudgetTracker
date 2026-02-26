import { Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { formatCurrency } from "../utils/utils";
import CreateExpenseModal from "./expenses/CreateExpenseModal";
import { useExpenses } from "../contexts/ExpenseContext";

export default function Header() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { expenses } = useExpenses();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleViewChart = () => {
    navigate("/chart");
  };

  const handleCreateExpense = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="page-title">Budget Tracker 🧮</h1>
          <p className="text-muted mb-0">Track and manage your expenses</p>
        </Col>
        <Col xs="auto">
          <Button
            variant="outline-danger"
            size="sm"
            className="logout-btn"
            onClick={handleLogout}
            title="Logout"
          >
            <span className="fs-5">🚪</span>
            <span className="d-none d-sm-inline ms-2">Logout</span>
          </Button>
        </Col>
      </Row>

      <Row className="mb-4 justify-content-center gap-3">
        <Col xs={12} md={4} lg={3} className="mb-3">
          <Button
            variant="primary"
            className="w-100 py-3"
            onClick={handleCreateExpense}
          >
            <span className="me-2">➕</span>
            Create Expense
          </Button>
        </Col>
        <Col xs={12} md={4} lg={3} className="mb-3">
          <Button
            variant="success"
            className="w-100 py-3"
            onClick={handleViewChart}
          >
            <span className="me-2">📈</span>
            View Expenses Chart
          </Button>
        </Col>
      </Row>

      <CreateExpenseModal show={showModal} onHide={handleCloseModal} />
    </>
  );
}
