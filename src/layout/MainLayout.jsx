import { Tabs, Tab, Box, Typography } from "@mui/material";
import { useState } from "react";
import Employees from "../pages/Employees";
import Attendance from "../pages/Attendance";

export default function MainLayout() {
  const [tab, setTab] = useState(0);

  return (
    // <Box sx={{ width: "100%", p: { xs: 2, md: 4 }}}>
    <Box
    sx={{
        width: "100%",
        maxWidth: "1200px",
        mx: "auto",        // centers content
        px: { xs: 2, md: 3 }, // equal left & right padding
        py: 3,
    }}
    >
      <Typography variant="h4" gutterBottom>
        HRMS Lite
      </Typography>

      <Tabs
        value={tab}
        onChange={(e, newValue) => setTab(newValue)}
        sx={{ mb: 3 }}
      >
        <Tab label="Employees" />
        <Tab label="Attendance" />
      </Tabs>

      {tab === 0 && <Employees />}
      {tab === 1 && <Attendance />}
    </Box>
  );
}
