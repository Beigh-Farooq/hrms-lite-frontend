import { useEffect, useState } from "react";
import { getEmployees } from "../services/employeeService";
import { getAttendance } from "../services/attendanceService";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceTable from "../components/AttendanceTable";

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getEmployees().then((res) => setEmployees(res.data));
  }, []);

  const loadAttendance = async (employeeId) => {
    try {
      setLoading(true);
      const res = await getAttendance(employeeId);
      setRecords(res.data.records);
    } catch {
      setError("Failed to load attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Attendance Management</h2>

      <AttendanceForm
        employees={employees}
        onSuccess={loadAttendance}
      />

      {loading && <p>Loading attendance...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && <AttendanceTable records={records} />}
    </div>
  );
}
