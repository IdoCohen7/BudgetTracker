import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import authService from "../services/authService";
import { parseErrorResponse } from "../utils/utils";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.Login(
        formData.email,
        formData.password,
      );
      setTokenInLocalStorage(response.data.token);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      setError(parseErrorResponse(error, "Login failed. Please try again."));
    } finally {
      setIsLoading(false);
    }
  };

  const setTokenInLocalStorage = (token) => {
    localStorage.setItem("authToken", token);
  };

  return (
    <div className="auth-page">
      <Form className="form-container" onSubmit={handleLogin}>
        {isLoading && (
          <div className="loading-overlay">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        <h2>Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            disabled={isLoading}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            disabled={isLoading}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Loading...
            </>
          ) : (
            "Login"
          )}
        </Button>
        <Link className="register-anchor" to="/register">
          Don't have an account? Register here.
        </Link>
      </Form>
    </div>
  );
}
