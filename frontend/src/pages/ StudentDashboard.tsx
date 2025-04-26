"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/Dashboard.css"

const StudentDashboard = () => {
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
            <div className="user-avatar">S</div>
            <div className="user-name">Student User</div>
            <div className="user-role">Student</div>
          </div>
          <nav className="sidebar-nav">
            <ul>
              <li className="nav-item active">Dashboard</li>
              <li className="nav-item">Courses</li>
              <li className="nav-item">Grades</li>
              <li className="nav-item">Schedule</li>
              <li className="nav-item">Profile</li>
            </ul>
          </nav>
        </div>

        <main className="dashboard-main">
          <h1 className="page-title">Student Dashboard</h1>

          <div className="dashboard-stats">
            <div className="stat-card">
              <div className="stat-value">4</div>
              <div className="stat-label">Enrolled Courses</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">3.8</div>
              <div className="stat-label">GPA</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">2</div>
              <div className="stat-label">Upcoming Exams</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">5</div>
              <div className="stat-label">Assignments Due</div>
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title">Recent Announcements</h2>
            <div className="announcement-list">
              <div className="announcement-item">
                <div className="announcement-title">Midterm Schedule Posted</div>
                <div className="announcement-date">2 days ago</div>
                <div className="announcement-content">
                  The midterm examination schedule has been posted. Please check your email for details.
                </div>
              </div>
              <div className="announcement-item">
                <div className="announcement-title">Library Hours Extended</div>
                <div className="announcement-date">1 week ago</div>
                <div className="announcement-content">
                  The library will be open until midnight during the exam period.
                </div>
              </div>
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title">Upcoming Assignments</h2>
            <div className="assignment-list">
              <div className="assignment-item">
                <div className="assignment-course">CS301: Data Structures</div>
                <div className="assignment-title">Binary Tree Implementation</div>
                <div className="assignment-due">Due in 3 days</div>
              </div>
              <div className="assignment-item">
                <div className="assignment-course">MATH201: Calculus II</div>
                <div className="assignment-title">Integration Problems Set</div>
                <div className="assignment-due">Due in 5 days</div>
              </div>
              <div className="assignment-item">
                <div className="assignment-course">ENG105: Technical Writing</div>
                <div className="assignment-title">Research Paper Draft</div>
                <div className="assignment-due">Due in 1 week</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default StudentDashboard
