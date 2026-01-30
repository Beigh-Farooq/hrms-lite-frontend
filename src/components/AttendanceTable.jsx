import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
  Typography,
  Box,
} from "@mui/material";

export default function AttendanceTable({ records }) {
  if (!records.length) {
    return (
      <Typography color="text.secondary">
        No attendance records found.
      </Typography>
    );
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((rec) => (
              <TableRow key={rec.id}>
                <TableCell>{rec.date}</TableCell>
                <TableCell>
                  <Chip
                    label={rec.status}
                    color={rec.status === "Present" ? "success" : "error"}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
}
