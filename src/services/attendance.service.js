import api from './api'

export const attendanceService = {
  getAll: (params) => api.get('/attendance', { params }),
  getByEmployee: (employeeId, params) =>
    api.get(`/attendance/employee/${employeeId}`, { params }),
  mark: (data) => api.post('/attendance', data),
  getDashboardSummary: () => api.get('/attendance/dashboard/summary'),
}
