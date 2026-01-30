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
    setError("");
    setLoading(true);

    try {
      await markAttendance(form);
      onEmployeeChange(form.employee_id); // reload full history
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to mark attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Mark Attendance
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Stack spacing={2} mt={2}>
        <FormControl fullWidth required>
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
        </FormControl>

        <TextField
          type="date"
          name="date"
          label="Date"
          InputLabelProps={{ shrink: true }}
          value={form.date}
          onChange={handleChange}
          required
        />

        <FormControl fullWidth>
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
