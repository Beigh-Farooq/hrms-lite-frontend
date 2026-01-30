import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import { useState } from "react";

function App() {
  const [page, setPage] = useState("employees");

  return (
    <div style={{ padding: "20px" }}>
      <h1>HRMS Lite</h1>

      <nav style={{ marginBottom: "20px" }}>
        <button onClick={() => setPage("employees")}>Employees</button>
        <button onClick={() => setPage("attendance")}>Attendance</button>
      </nav>

      {page === "employees" && <Employees />}
      {page === "attendance" && <Attendance />}
    </div>
  );
}

export default App;
