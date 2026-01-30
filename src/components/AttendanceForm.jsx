import { useState } from "react";
import { markAttendance } from "../services/attendanceService";

export default function AttendanceForm({ employees, onSuccess }) {
  const [form, setForm] = useState({
    employee_id: "",
    date: "",
    status: "Present",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await markAttendance(form);
      onSuccess(form.employee_id);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to mark attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Mark Attendance</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <select
        name="employee_id"
        value={form.employee_id}
        onChange={(e) => {
            handleChange(e);
            onSuccess(e.target.value);
        }}
        required
      >
        <option value="">Select Employee</option>
        {employees.map((emp) => (
          <option key={emp.id} value={emp.employee_id}>
            {emp.full_name} ({emp.employee_id})
          </option>
        ))}
      </select>

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
      />

      <select name="status" value={form.status} onChange={handleChange}>
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>

      <button disabled={loading}>
        {loading ? "Saving..." : "Submit"}
      </button>
    </form>
  );
}
