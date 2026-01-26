import { useState, useEffect } from "react";
import { FaUserPlus, FaTrash, FaTimes } from "react-icons/fa";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import FormField from "../../components/FormField";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import EmptyState from "../../components/EmptyState";
import { employeeService } from "../../services/employee.service";
import { toastSuccess, toastError } from "../../utils/toast";
import "./Employees.css";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [formData, setFormData] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    department: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await employeeService.getAll();
      setEmployees(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.employeeId.trim())
      errors.employeeId = "Employee ID is required";
    if (!formData.fullName.trim()) errors.fullName = "Full Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.department.trim())
      errors.department = "Department is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSubmitting(true);
      await employeeService.create(formData);
      toastSuccess("Employee added successfully.");
      setIsModalOpen(false);
      setFormData({ employeeId: "", fullName: "", email: "", department: "" });
      setFormErrors({});
      fetchEmployees();
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Failed to create employee";
      toastError(errorMsg);
      if (err.response?.data?.errors) {
        const validationErrors = {};
        err.response.data.errors.forEach((error) => {
          validationErrors[error.path] = error.msg;
        });
        setFormErrors(validationErrors);
      } else {
        setError(errorMsg);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeleting(true);
      await employeeService.delete(id);
      toastSuccess("Employee deleted successfully.");
      setDeleteConfirm(null);
      fetchEmployees();
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Failed to delete employee";
      toastError(errorMsg);
      setError(err.response?.data?.error || "Failed to delete employee");
      setDeleteConfirm(null);
    } finally {
      setDeleting(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setFormData({ employeeId: "", fullName: "", email: "", department: "" });
    setFormErrors({});
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ employeeId: "", fullName: "", email: "", department: "" });
    setFormErrors({});
  };

  if (loading) return <Loading message="Loading employees..." />;
  if (error && employees.length === 0)
    return <ErrorMessage message={error} onRetry={fetchEmployees} />;

  return (
    <div className="employees-page">
      <div className="page-header">
        <div>
          <h1>Employees</h1>
          <p className="page-subtitle">Manage employee records</p>
        </div>
        <Button onClick={openModal}>
          <FaUserPlus style={{ marginRight: "0.5rem" }} />
          Add Employee
        </Button>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
          <button onClick={() => setError(null)} className="btn-close-icon">
            <FaTimes />
          </button>
        </div>
      )}

      <Card>
        {employees.length === 0 ? (
          <EmptyState
            message="No employees found. Add your first employee to get started."
            action={
              <Button onClick={openModal}>
                <FaUserPlus style={{ marginRight: "0.5rem" }} />
                Add Employee
              </Button>
            }
          />
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.employeeId}</td>
                    <td>{employee.fullName}</td>
                    <td>{employee.email}</td>
                    <td>{employee.department}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => setDeleteConfirm(employee)}
                      >
                        <FaTrash />
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Add New Employee">
        <form onSubmit={handleSubmit}>
          <FormField
            label="Employee ID"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleInputChange}
            error={formErrors.employeeId}
            required
            placeholder="e.g., EMP001"
          />
          <FormField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            error={formErrors.fullName}
            required
            placeholder="John Doe"
          />
          <FormField
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={formErrors.email}
            required
            placeholder="john.doe@example.com"
          />
          <FormField
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            error={formErrors.department}
            required
            placeholder="Engineering"
          />
          <div className="form-actions">
            <Button type="button" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Adding..." : "Add Employee"}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={!!deleteConfirm}
        // onClose={() => setDeleteConfirm(null)}
        onClose={() => !deleting && setDeleteConfirm(null)}
        title="Confirm Delete"
      >
        <p>
          Are you sure you want to delete{" "}
          <strong>{deleteConfirm?.fullName}</strong>? This action cannot be
          undone.
        </p>
        <div className="form-actions">
          <Button
            type="button"
            variant="outline"
            onClick={() => setDeleteConfirm(null)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={() => handleDelete(deleteConfirm.id)}
          >
            {/* <FaTrash />
            Delete */}
            {deleting ? (
              "Deleting..."
            ) : (
              <>
                <FaTrash />
                Delete
              </>
            )}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Employees;
