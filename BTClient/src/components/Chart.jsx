import { useLoaderData, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import expenseService from "../services/expenseService";
import { formatCurrency, CATEGORY_COLORS } from "../utils/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Loader function
export async function chartLoader() {
  try {
    const response = await expenseService.getExpensesChart();
    return response.data;
  } catch (error) {
    console.error("Error loading chart data:", error);
    return [];
  }
}

// Custom tooltip for the chart
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "white",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <p className="mb-1 fw-bold">{payload[0].payload.name}</p>
        <p className="mb-0 text-danger fw-bold">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

const MyChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={400}>
    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
      <XAxis
        dataKey="name"
        stroke="#64748b"
        fontSize={14}
        fontWeight={500}
        tickLine={false}
      />
      <YAxis
        stroke="#64748b"
        fontSize={14}
        tickFormatter={(value) => `$${value}`}
        tickLine={false}
      />
      <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f1f5f9" }} />
      <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={CATEGORY_COLORS[entry.name] || CATEGORY_COLORS.Other}
          />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export default function Chart() {
  const chartData = useLoaderData();
  const navigate = useNavigate();

  // extract list from data object and transform it for the chart
  const data =
    chartData?.list?.map((item) => ({
      name: item.category,
      amount: item.totalExpense,
    })) || [];

  return (
    <Container fluid className="py-4" style={{ backgroundColor: "#f8fafc" }}>
      {/* Header Section */}
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="page-title">Expense Chart</h1>
          <p className="text-muted mb-0">
            View your expenses breakdown by category
          </p>
        </Col>
        <Col xs="auto">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => navigate("/")}
            title="Back to Home"
          >
            <span className="fs-5">🏠</span>
            <span className="d-none d-sm-inline ms-2">Back to Home</span>
          </Button>
        </Col>
      </Row>

      {/* Chart Card */}
      <Row>
        <Col xs={12}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              {data.length > 0 ? (
                <>
                  <h5 className="mb-4 fw-bold">Expenses by Category</h5>
                  <MyChart data={data} />
                </>
              ) : (
                <div className="text-center py-5">
                  <span className="fs-1 mb-3 d-block">📊</span>
                  <p className="text-muted mb-0">No expense data available</p>
                  <small className="text-muted">
                    Start adding expenses to see your chart
                  </small>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Category Breakdown Cards */}
      {data.length > 0 && (
        <Row className="mt-4">
          {/* Total Card */}
          <Col xs={12} md={6} lg={4} className="mb-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-muted mb-1 small">Total</p>
                    <h5 className="mb-0 fw-bold text-danger">
                      {formatCurrency(chartData?.total || 0)}
                    </h5>
                    <small className="text-muted">100% of total</small>
                  </div>
                  <div className="bg-danger bg-opacity-10 p-3 rounded-circle">
                    <span className="fs-4">💰</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          {/* Category Cards */}
          {data.map((item, index) => (
            <Col xs={12} md={6} lg={4} key={index} className="mb-3">
              <Card className="border-0 shadow-sm h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="text-muted mb-1 small">{item.name}</p>
                      <h5
                        className="mb-0 fw-bold"
                        style={{ color: CATEGORY_COLORS[item.name] }}
                      >
                        {formatCurrency(item.amount)}
                      </h5>
                      <small className="text-muted">
                        {(
                          (item.amount / (chartData?.total || 1)) *
                          100
                        ).toFixed(1)}
                        % of total
                      </small>
                    </div>
                    <div
                      className="p-3 rounded-circle"
                      style={{
                        backgroundColor: `${CATEGORY_COLORS[item.name]}15`,
                      }}
                    >
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "4px",
                          backgroundColor: CATEGORY_COLORS[item.name],
                        }}
                      ></div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
