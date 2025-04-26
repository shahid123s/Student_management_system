"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/Dashboard.css"

const AdminDashboard = () => {
  const navigate = useNavigate()

  // In a real app, you would check if the user is authenticated
  useEffect(() => {
    // Simulating authentication check
    const isAuthenticated = true // This would be a real check in a production app

    if (!isAuthenticated) {
      navigate("/login")
    }
  }, [navigate])

  const handleLogout = () => {
    // In a real app, you would clear authentication state
    navigate("/")
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="dashboard-logo">Student Management System</div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-sidebar">
          <div className="user-info">
            <div className="user-avatar admin-avatar">A</div>
            <div className="user-name">Admin User</div>
            <div className="user-role">Administrator</div>
          </div>
          <nav className="sidebar-nav">
            <ul>
              <li className="nav-item active">Dashboard</li>
              <li className="nav-item">Students</li>
              <li className="nav-item">Courses</li>
              <li className="nav-item">Faculty</li>
              <li className="nav-item">Reports</li>
              <li className="nav-item">Settings</li>
            </ul>
          </nav>
        </div>

        <main className="dashboard-main">
          <h1 className="page-title">Admin Dashboard</h1>

          <div className="dashboard-stats">
            <div className="stat-card">
              <div className="stat-value">250</div>
              <div className="stat-label">Total Students</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">15</div>
              <div className="stat-label">Departments</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">42</div>
              <div className="stat-label">Courses</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">28</div>
              <div className="stat-label">Faculty Members</div>
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title">Recent Student Registrations</h2>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Registration Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>S12345</td>
                    <td>John Smith</td>
                    <td>Computer Science</td>
                    <td>2023-04-15</td>
                    <td>
                      <span className="status-badge status-active">Active</span>
                    </td>
                  </tr>
                  <tr>
                    <td>S12346</td>
                    <td>Emily Johnson</td>
                    <td>Engineering</td>
                    <td>2023-04-14</td>
                    <td>
                      <span className="status-badge status-active">Active</span>
                    </td>
                  </tr>
                  <tr>
                    <td>S12347</td>
                    <td>Michael Brown</td>
                    <td>Business</td>
                    <td>2023-04-12</td>
                    <td>
                      <span className="status-badge status-pending">Pending</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title">System Notifications</h2>
            <div className="notification-list">
              <div className="notification-item">
                <div className="notification-icon notification-warning">!</div>
                <div className="notification-content">
                  <div className="notification-title">Course Registration Deadline</div>
                  <div className="notification-message">
                    Course registration deadline is approaching. Remind students to complete their registration.
                  </div>
                  <div className="notification-time">2 hours ago</div>
                </div>
              </div>
              <div className="notification-item">
                <div className="notification-icon notification-info">i</div>
                <div className="notification-content">
                  <div className="notification-title">System Maintenance</div>
                  <div className="notification-message">
                    Scheduled system maintenance on Sunday, April 25th from 2:00 AM to 5:00 AM.
                  </div>
                  <div className="notification-time">1 day ago</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
