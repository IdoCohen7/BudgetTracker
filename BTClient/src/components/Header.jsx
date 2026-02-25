import { Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { formatCurrency } from "../utils/utils";

export default function Header({ expenses }) {
  const navigate = useNavigate();

  // calculating total expenses
  const totalExpenses = useMemo(() => {
    return expenses?.reduce((sum, expense) => sum + (expense.sum || 0), 0) || 0;
  }, [expenses]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleViewChart = () => {
    console.log("View chart clicked");
  };

  const handleCreateExpense = () => {
    console.log("Create expense clicked");
    // navigate("/expense/create"); // Uncomment when create page is ready
  };

  return (
    <>
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="page-title">Budget Tracker</h1>
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

      {/* Action Buttons */}
      <Row className="mb-4">
        <Col xs={12} md={6} className="mb-3">
          <Button
            variant="primary"
            size="lg"
            className="w-100 py-3"
            onClick={handleCreateExpense}
          >
            <span className="fs-5 me-2">➕</span>
            Create Expense
          </Button>
        </Col>
        <Col xs={12} md={6} className="mb-3">
          <Button
            variant="success"
            size="lg"
            className="w-100 py-3"
            onClick={handleViewChart}
          >
            <span className="fs-5 me-2">📈</span>
            View Expenses Chart
          </Button>
        </Col>
      </Row>
      {/* Summary Cards */}
      <Row className="mb-4">
        <Col xs={12} md={6} className="mb-3">
          <Card className="summary-card border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1 small">Total Expenses</p>
                  <h3 className="mb-0 fw-bold text-danger">
                    {formatCurrency(totalExpenses)}
                  </h3>
                </div>
                <div className="summary-icon bg-danger bg-opacity-10 p-3 rounded-circle">
                  <span className="fs-3">💰</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} className="mb-3">
          <Card className="summary-card border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1 small">Total Transactions</p>
                  <h3 className="mb-0 fw-bold text-primary">
                    {expenses?.length || 0}
                  </h3>
                </div>
                <div className="summary-icon bg-primary bg-opacity-10 p-3 rounded-circle">
                  <span className="fs-3">📊</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
