export default function EmployeeTable({ employees, onDelete }) {
  if (!employees.length) {
    return <p>No employees found.</p>;
  }

  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp.id}>
            <td>{emp.employee_id}</td>
            <td>{emp.full_name}</td>
            <td>{emp.email}</td>
            <td>{emp.department}</td>
            <td>
              <button onClick={() => onDelete(emp.employee_id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
