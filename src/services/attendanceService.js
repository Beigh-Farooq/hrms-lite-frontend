import api from "./api";

export const markAttendance = (data) =>
  api.post("/attendance", data);

export const getAttendance = (employeeId) =>
  api.get(`/attendance/${employeeId}`);
