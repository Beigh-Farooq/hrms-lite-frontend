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
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await createEmployee(form);
      setForm({ employee_id: "", full_name: "", email: "", department: "" });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{p: 3,mb: 3,width: "100%"}}>
      <Typography variant="h6" gutterBottom>
        Add Employee
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Stack spacing={2} mt={2}>
        <TextField label="Employee ID" name="employee_id" value={form.employee_id} onChange={handleChange} required />
        <TextField label="Full Name" name="full_name" value={form.full_name} onChange={handleChange} required />
        <TextField label="Email" name="email" value={form.email} onChange={handleChange} required />
        <TextField label="Department" name="department" value={form.department} onChange={handleChange} required />

        <Button variant="contained" disabled={loading} onClick={handleSubmit}>
          {loading ? "Saving..." : "Add Employee"}
        </Button>
      </Stack>
    </Paper>
  );
}
