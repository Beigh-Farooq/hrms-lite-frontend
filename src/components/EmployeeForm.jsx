import { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  Alert,
  Paper,
  Typography,
} from "@mui/material";
import { createEmployee } from "../services/employeeService";

export default function EmployeeForm({ onSuccess }) {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});

    // Client-side validation
    const errors = {};
    if (!form.employee_id.trim()) errors.employee_id = "Employee Id is required";
    if (!form.full_name.trim()) errors.full_name = "Name is required";
    if (!form.email.trim()) errors.email = "Email is required";
    if (!form.department.trim()) errors.department = "Department is required";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    try {
      await createEmployee(form);
      setForm({ employee_id: "", full_name: "", email: "", department: "" });
      onSuccess();
    } catch (err) {
      if (err.response?.status === 422 && err.response?.data?.detail) {
        // Handle Pydantic validation errors
        const validationErrors = err.response.data.detail;
        if (Array.isArray(validationErrors)) {
          const errors = {};
          validationErrors.forEach(error => {
            const field = error.loc[1]; // Assuming loc is ['body', 'field_name']
            errors[field] = error.msg;
          });
          setFieldErrors(errors);
        } else {
          setFieldErrors({ general: err.response.data.detail });
        }
      } else {
        setFieldErrors({ general: err.response?.data?.detail || "Something went wrong" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add Employee
      </Typography>

      {fieldErrors.general && <Alert severity="error">{fieldErrors.general}</Alert>}

      <Stack spacing={2} mt={2}>
        <TextField
          label="Employee ID"
          name="employee_id"
          value={form.employee_id}
          onChange={handleChange}
          required
          error={!!fieldErrors.employee_id}
          helperText={fieldErrors.employee_id}
        />
        <TextField
          label="Full Name"
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          required
          error={!!fieldErrors.full_name}
          helperText={fieldErrors.full_name}
        />
        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          error={!!fieldErrors.email}
          helperText={fieldErrors.email}
        />
        <TextField
          label="Department"
          name="department"
          value={form.department}
          onChange={handleChange}
          required
          error={!!fieldErrors.department}
          helperText={fieldErrors.department}
        />

        <Button variant="contained" disabled={loading} onClick={handleSubmit}>
          {loading ? "Saving..." : "Add Employee"}
        </Button>
      </Stack>
    </Paper>
  );
}
