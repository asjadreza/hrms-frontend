import { useState, useEffect } from 'react'
import { FaCalendarCheck, FaTimes, FaFilter } from 'react-icons/fa'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import FormField from '../../components/FormField'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import EmptyState from '../../components/EmptyState'
import { attendanceService } from '../../services/attendance.service'
import { employeeService } from '../../services/employee.service'
import './Attendance.css'

const Attendance = () => {
  const [attendances, setAttendances] = useState([])
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [filterEmployeeId, setFilterEmployeeId] = useState('')
  const [filterStartDate, setFilterStartDate] = useState('')
  const [filterEndDate, setFilterEndDate] = useState('')
  const [formData, setFormData] = useState({
    employeeId: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present',
  })
  const [formErrors, setFormErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    fetchEmployees()
    fetchAttendances()
  }, [])

  useEffect(() => {
    fetchAttendances()
  }, [filterEmployeeId, filterStartDate, filterEndDate])

  const fetchEmployees = async () => {
    try {
      const response = await employeeService.getAll()
      setEmployees(response.data)
    } catch (err) {
      console.error('Failed to load employees:', err)
    }
  }

  const fetchAttendances = async () => {
    try {
      setLoading(true)
      setError(null)
      const params = {}
      if (filterEmployeeId) params.employeeId = filterEmployeeId
      if (filterStartDate) params.startDate = filterStartDate
      if (filterEndDate) params.endDate = filterEndDate

      const response = await attendanceService.getAll(params)
      setAttendances(response.data)

      // If an employee is selected, fetch their summary
      if (filterEmployeeId) {
        const summaryResponse = await attendanceService.getByEmployee(
          filterEmployeeId,
          params
        )
        setSummary(summaryResponse.data.summary)
      } else {
        setSummary(null)
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load attendance records')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.employeeId) errors.employeeId = 'Employee is required'
    if (!formData.date) errors.date = 'Date is required'
    if (!formData.status) errors.status = 'Status is required'

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      setSubmitting(true)
      const payload = {
        ...formData,
        date: new Date(formData.date).toISOString(),
      }
      await attendanceService.mark(payload)
      setIsModalOpen(false)
      setFormData({
        employeeId: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Present',
      })
      setFormErrors({})
      fetchAttendances()
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to mark attendance'
      if (err.response?.data?.errors) {
        const validationErrors = {}
        err.response.data.errors.forEach((error) => {
          validationErrors[error.path] = error.msg
        })
        setFormErrors(validationErrors)
      } else {
        setError(errorMsg)
      }
    } finally {
      setSubmitting(false)
    }
  }

  const openModal = (employee = null) => {
    if (employee) {
      setFormData({
        employeeId: employee.id,
        date: new Date().toISOString().split('T')[0],
        status: 'Present',
      })
      setSelectedEmployee(employee)
    } else {
      setFormData({
        employeeId: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Present',
      })
      setSelectedEmployee(null)
    }
    setIsModalOpen(true)
    setFormErrors({})
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setFormData({
      employeeId: '',
      date: new Date().toISOString().split('T')[0],
      status: 'Present',
    })
    setFormErrors({})
    setSelectedEmployee(null)
  }

  const clearFilters = () => {
    setFilterEmployeeId('')
    setFilterStartDate('')
    setFilterEndDate('')
  }

  const getEmployeeName = (employeeId) => {
    const employee = employees.find((emp) => emp.id === employeeId)
    return employee ? employee.fullName : 'Unknown'
  }

  if (loading && attendances.length === 0)
    return <Loading message="Loading attendance records..." />
  if (error && attendances.length === 0)
    return <ErrorMessage message={error} onRetry={fetchAttendances} />

  return (
    <div className="attendance-page">
      <div className="page-header">
        <div>
          <h1>Attendance</h1>
          <p className="page-subtitle">Mark and view attendance records</p>
        </div>
        <Button onClick={() => openModal()}>
          <FaCalendarCheck style={{ marginRight: '0.5rem' }} />
          Mark Attendance
        </Button>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      {summary && (
        <div className="summary-cards">
          <Card className="summary-card">
            <div className="summary-content">
              <p className="summary-label">Total Records</p>
              <p className="summary-value">{summary.totalRecords}</p>
            </div>
          </Card>
          <Card className="summary-card summary-success">
            <div className="summary-content">
              <p className="summary-label">Present Days</p>
              <p className="summary-value">{summary.totalPresent}</p>
            </div>
          </Card>
          <Card className="summary-card summary-danger">
            <div className="summary-content">
              <p className="summary-label">Absent Days</p>
              <p className="summary-value">{summary.totalAbsent}</p>
            </div>
          </Card>
        </div>
      )}

      <Card
        title={
          <>
            <FaFilter style={{ marginRight: '0.5rem', display: 'inline-block' }} />
            Filters
          </>
        }
        actions={
          (filterEmployeeId || filterStartDate || filterEndDate) && (
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          )
        }
      >
        <div className="filters">
          <FormField
            label="Filter by Employee"
            name="filterEmployee"
            type="select"
            value={filterEmployeeId}
            onChange={(e) => setFilterEmployeeId(e.target.value)}
            options={[
              { value: '', label: 'All Employees' },
              ...employees.map((emp) => ({
                value: emp.id,
                label: `${emp.employeeId} - ${emp.fullName}`,
              })),
            ]}
          />
          <FormField
            label="Start Date"
            name="filterStartDate"
            type="date"
            value={filterStartDate}
            onChange={(e) => setFilterStartDate(e.target.value)}
          />
          <FormField
            label="End Date"
            name="filterEndDate"
            type="date"
            value={filterEndDate}
            onChange={(e) => setFilterEndDate(e.target.value)}
          />
        </div>
      </Card>

      <Card title="Attendance Records">
        {attendances.length === 0 ? (
          <EmptyState
            message="No attendance records found."
            action={<Button onClick={() => openModal()}>Mark Attendance</Button>}
          />
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Employee ID</th>
                  <th>Employee Name</th>
                  <th>Department</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendances.map((attendance) => (
                  <tr key={attendance.id}>
                    <td>
                      {new Date(attendance.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td>{attendance.employee.employeeId}</td>
                    <td>{attendance.employee.fullName}</td>
                    <td>{attendance.employee.department}</td>
                    <td>
                      <span
                        className={`badge ${
                          attendance.status === 'Present'
                            ? 'badge-success'
                            : 'badge-danger'
                        }`}
                      >
                        {attendance.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Mark Attendance"
      >
        <form onSubmit={handleSubmit}>
          <FormField
            label="Employee"
            name="employeeId"
            type="select"
            value={formData.employeeId}
            onChange={handleInputChange}
            error={formErrors.employeeId}
            required
            options={employees.map((emp) => ({
              value: emp.id,
              label: `${emp.employeeId} - ${emp.fullName} (${emp.department})`,
            }))}
          />
          <FormField
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleInputChange}
            error={formErrors.date}
            required
          />
          <FormField
            label="Status"
            name="status"
            type="select"
            value={formData.status}
            onChange={handleInputChange}
            error={formErrors.status}
            required
            options={[
              { value: 'Present', label: 'Present' },
              { value: 'Absent', label: 'Absent' },
            ]}
          />
          <div className="form-actions">
            <Button type="button" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? (
                'Saving...'
              ) : (
                <>
                  <FaCalendarCheck style={{ marginRight: '0.5rem' }} />
                  Mark Attendance
                </>
              )}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Attendance
