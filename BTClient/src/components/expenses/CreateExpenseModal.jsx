import { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { useExpenses } from "../../contexts/ExpenseContext";

export default function CreateExpenseModal({ show, onHide }) {
  const [formData, setFormData] = useState({
    description: "",
    sum: "",
    category: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addExpense } = useExpenses();

  const handleCloseModal = () => {
    setFormData({ description: "", sum: "", category: "" });
    setError("");
    onHide();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.sum || !formData.category) {
      setError("Sum and Category are required fields");
      return;
    }

    const sumValue = parseFloat(formData.sum);
    if (isNaN(sumValue) || sumValue <= 0) {
      setError("Sum must be a positive number");
      return;
    }

    setIsSubmitting(true);

    try {
      await addExpense(formData.description, sumValue, formData.category);
      handleCloseModal();
    } catch (err) {
      console.error("Error creating expense:", err);
      setError(
        err.response?.data || "Failed to create expense. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Description (Optional)</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Sum <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="number"
              name="sum"
              placeholder="Enter amount"
              value={formData.sum}
              onChange={handleInputChange}
              required
              min="0.01"
              step="0.01"
              disabled={isSubmitting}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Category <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            >
              <option value="">Select a category</option>
              <option value="Housing">Housing</option>
              <option value="Groceries">Groceries</option>
              <option value="Savings">Savings</option>
              <option value="Fun">Fun</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex gap-2 justify-content-end">
            <Button
              variant="secondary"
              onClick={handleCloseModal}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Expense"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
