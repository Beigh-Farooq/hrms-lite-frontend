import { useEffect, useState } from "react";
import { Typography, CircularProgress } from "@mui/material";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceTable from "../components/AttendanceTable";
import { getEmployees } from "../services/employeeService";
import { getAttendance } from "../services/attendanceService";

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getEmployees().then((res) => setEmployees(res.data));
  }, []);

  const loadAttendance = async (employeeId) => {
    if (!employeeId) return;

    try {
      setLoading(true);
      const res = await getAttendance(employeeId);
      setRecords(res.data.records);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
     

      <AttendanceForm
        employees={employees}
        onEmployeeChange={loadAttendance}
      />

      {loading ? (
        <CircularProgress />
      ) : (
        <AttendanceTable records={records} />
      )}
    </div>
  );
}
