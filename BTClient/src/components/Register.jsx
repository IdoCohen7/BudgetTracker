import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { useState } from "react";
import { parseErrorResponse } from "../utils/utils";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const registrationResponse = await authService.Register(
        formData.name,
        formData.email,
        formData.password,
        formData.passwordConfirm,
      );
      setSuccess(true);

      // auto-login after successful registration
      try {
        const loginResponse = await authService.Login(
          formData.email,
          formData.password,
        );

        localStorage.setItem("authToken", loginResponse.data.token);

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } catch (loginError) {
        console.error("Auto-login failed:", loginError);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError(
        parseErrorResponse(error, "Registration failed. Please try again."),
      );
    }
  };
  return (
    <div className="auth-page">
      <Form className="form-container" onSubmit={handleRegister}>
        <h2>Register</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && (
          <div className="alert alert-success">
            Registration successful! Logging you in...
          </div>
        )}
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formRegisterEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formRegisterPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formRegisterPasswordConfirm">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={formData.passwordConfirm}
            onChange={(e) =>
              setFormData({ ...formData, passwordConfirm: e.target.value })
            }
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
        <Link className="register-anchor" to="/login">
          Already have an account? Login here.
        </Link>
      </Form>
    </div>
  );
}
