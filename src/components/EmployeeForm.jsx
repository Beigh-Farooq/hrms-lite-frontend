import { useState } from "react";
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
    <form onSubmit={handleSubmit}>
      <h3>Add Employee</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input name="employee_id" placeholder="Employee ID" value={form.employee_id} onChange={handleChange} required />
      <input name="full_name" placeholder="Full Name" value={form.full_name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="department" placeholder="Department" value={form.department} onChange={handleChange} required />

      <button disabled={loading}>
        {loading ? "Saving..." : "Add Employee"}
      </button>
    </form>
  );
}
