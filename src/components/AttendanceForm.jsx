import { useState } from "react";
import {
  Paper,
  Typography,
  Stack,
  Button,
  Alert,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { markAttendance } from "../services/attendanceService";

export default function AttendanceForm({ employees, onEmployeeChange }) {
  const [form, setForm] = useState({
    employee_id: "",
    date: "",
    status: "Present",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Auto-load attendance when employee changes
    if (name === "employee_id") {
      onEmployeeChange(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setLoading(true);

    // Client-side validation
    const errors = {};
    if (!form.employee_id) {
      errors.employee_id = "Select Employee is required";
    }
    if (!form.date) {
      errors.date = "Date is required";
    }
    if (!form.status) {
      errors.status = "Status is required";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setLoading(false);
      return;
    }

    try {
      await markAttendance(form);
      onEmployeeChange(form.employee_id); // reload full history
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
        setFieldErrors({ general: err.response?.data?.detail || "Failed to mark attendance" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Mark Attendance
      </Typography>

      {fieldErrors.general && <Alert severity="error">{fieldErrors.general}</Alert>}

      <Stack spacing={2} mt={2}>
        <FormControl fullWidth required error={!!fieldErrors.employee_id}>
          <InputLabel>Employee</InputLabel>
          <Select
            name="employee_id"
            value={form.employee_id}
            label="Employee"
            onChange={handleChange}
          >
            {employees.map((emp) => (
              <MenuItem key={emp.id} value={emp.employee_id}>
                {emp.full_name} ({emp.employee_id})
              </MenuItem>
            ))}
          </Select>
          {fieldErrors.employee_id && <Typography variant="caption" color="error">{fieldErrors.employee_id}</Typography>}
        </FormControl>

        <TextField
          type="date"
          name="date"
          label="Date"
          InputLabelProps={{ shrink: true }}
          value={form.date}
          onChange={handleChange}
          required
          error={!!fieldErrors.date}
          helperText={fieldErrors.date}
        />

        <FormControl fullWidth error={!!fieldErrors.status}>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={form.status}
            label="Status"
            onChange={handleChange}
          >
            <MenuItem value="Present">Present</MenuItem>
            <MenuItem value="Absent">Absent</MenuItem>
          </Select>
          {fieldErrors.status && <Typography variant="caption" color="error">{fieldErrors.status}</Typography>}
        </FormControl>

        <Button
          variant="contained"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Saving..." : "Submit Attendance"}
        </Button>
      </Stack>
    </Paper>
  );
}
