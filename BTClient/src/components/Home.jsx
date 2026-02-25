import { useLoaderData } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import expenseService from "../services/expenseService";
import Header from "./Header";
import ExpensesList from "./expenses/ExpensesList";

// loader function
export async function homeLoader() {
  try {
    const response = await expenseService.getAllExpenses();
    return response.data;
  } catch (error) {
    console.error("Error loading expenses:", error);
    return [];
  }
}

export default function Home() {
  const expenses = useLoaderData();

  return (
    <Container fluid className="home-page py-4">
      {/* Header Section */}
      <Header expenses={expenses} />

      {/* Expenses List */}
      <Row>
        <Col xs={12}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-0">
              <ExpensesList expenses={expenses} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
