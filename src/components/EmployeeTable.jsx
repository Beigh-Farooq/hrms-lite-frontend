import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  TableContainer
} from "@mui/material";

export default function EmployeeTable({ employees, onDelete }) {
  if (!employees.length) return <p>No employees found.</p>;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>{emp.employee_id}</TableCell>
                <TableCell>{emp.full_name}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>
                  <Button
                    color="error"
                    onClick={() => onDelete(emp.employee_id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
