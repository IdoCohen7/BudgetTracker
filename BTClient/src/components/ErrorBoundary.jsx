import { useRouteError, useNavigate } from "react-router-dom";
import { Container, Button, Card } from "react-bootstrap";

export default function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  console.error("Route error:", error);

  return (
    <div className="auth-page">
      <Container className="d-flex justify-content-center align-items-center">
        <Card className="form-container text-center">
          <Card.Body className="py-5">
            <div className="mb-4">
              <span className="display-1">⚠️</span>
            </div>
            <h2 className="mb-3 fw-bold text-danger">
              Oops! Something went wrong
            </h2>
            <p className="text-muted mb-4">
              {error?.statusText ||
                error?.message ||
                "An unexpected error occurred"}
            </p>

            {error?.status && (
              <div className="mb-4">
                <span className="badge bg-danger fs-5 px-4 py-2">
                  Error {error.status}
                </span>
              </div>
            )}

            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Button
                variant="primary"
                onClick={() => navigate(-1)}
                className="px-4"
              >
                <span className="me-2">←</span>
                Go Back
              </Button>
              <Button
                variant="outline-primary"
                onClick={() => navigate("/")}
                className="px-4"
              >
                <span className="me-2">🏠</span>
                Home
              </Button>
            </div>

            {process.env.NODE_ENV === "development" && error?.stack && (
              <details className="mt-4 text-start">
                <summary className="text-muted cursor-pointer mb-2">
                  <small>Error Details (Development Only)</small>
                </summary>
                <pre className="bg-light p-3 rounded text-danger small overflow-auto">
                  {error.stack}
                </pre>
              </details>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
