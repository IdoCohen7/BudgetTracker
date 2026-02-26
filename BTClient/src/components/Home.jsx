import { Container, Row, Col, Card } from "react-bootstrap";
import Header from "./Header";
import { ExpenseProvider, useExpenses } from "../contexts/ExpenseContext";
import { Suspense } from "react";
import { lazy } from "react";
import { Spinner } from "react-bootstrap";

const ExpensesList = lazy(() => import("./expenses/ExpensesList"));

function HomeContent() {
  const { expenses, loading, hasMore, loadMore } = useExpenses();

  return (
    <Container fluid className="home-page py-4">
      <Header />
      <Row>
        <Col xs={12}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-0">
              <Suspense
                fallback={
                  <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                    <span className="ms-2 d-block">Loading...</span>
                  </div>
                }
              >
                <ExpensesList
                  expenses={expenses}
                  hasMore={hasMore}
                  onLoadMore={loadMore}
                  loading={loading}
                />
              </Suspense>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default function Home() {
  return (
    <ExpenseProvider>
      <HomeContent />
    </ExpenseProvider>
  );
}
