import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaUsers, FaChartBar, FaCheckCircle, FaTimesCircle, FaUser, FaCalendarAlt } from 'react-icons/fa'
import Card from '../../components/Card'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import { attendanceService } from '../../services/attendance.service'
import './Dashboard.css'

const Dashboard = () => {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchSummary()
  }, [])

  const fetchSummary = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await attendanceService.getDashboardSummary()
      setSummary(response.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading message="Loading dashboard..." />
  if (error) return <ErrorMessage message={error} onRetry={fetchSummary} />
  if (!summary) return null

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p className="page-subtitle">Overview of your HRMS</p>
      </div>

      <div className="stats-grid">
        <Card className="stat-card">
          <div className="stat-content">
            <div className="stat-icon">
              <FaUsers />
            </div>
            <div className="stat-info">
              <p className="stat-label">Total Employees</p>
              <p className="stat-value">{summary.totalEmployees}</p>
            </div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-content">
            <div className="stat-icon">
              <FaChartBar />
            </div>
            <div className="stat-info">
              <p className="stat-label">Total Records</p>
              <p className="stat-value">{summary.totalAttendanceRecords}</p>
            </div>
          </div>
        </Card>

        <Card className="stat-card stat-success">
          <div className="stat-content">
            <div className="stat-icon">
              <FaCheckCircle />
            </div>
            <div className="stat-info">
              <p className="stat-label">Present Days</p>
              <p className="stat-value">{summary.presentCount}</p>
            </div>
          </div>
        </Card>

        <Card className="stat-card stat-danger">
          <div className="stat-content">
            <div className="stat-icon">
              <FaTimesCircle />
            </div>
            <div className="stat-info">
              <p className="stat-label">Absent Days</p>
              <p className="stat-value">{summary.absentCount}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Employee Attendance Summary">
        {summary.employeesSummary.length === 0 ? (
          <div className="empty-table">
            <p>No employees found. <Link to="/employees">Add employees</Link> to get started.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Full Name</th>
                  <th>Department</th>
                  <th>Total Days</th>
                  <th>Present Days</th>
                </tr>
              </thead>
              <tbody>
                {summary.employeesSummary.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.employeeId}</td>
                    <td>{emp.fullName}</td>
                    <td>{emp.department}</td>
                    <td>{emp.totalAttendanceDays}</td>
                    <td>
                      <span className="badge badge-success">
                        {emp.presentDays}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <div className="quick-actions">
        <Link to="/employees" className="action-card">
          <div className="action-icon">
            <FaUser />
          </div>
          <h3>Manage Employees</h3>
          <p>Add, view, and delete employee records</p>
        </Link>
        <Link to="/attendance" className="action-card">
          <div className="action-icon">
            <FaCalendarAlt />
          </div>
          <h3>Mark Attendance</h3>
          <p>Record daily attendance for employees</p>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard
