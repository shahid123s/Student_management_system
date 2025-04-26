"use client"

import { useState, type FormEvent, type ChangeEvent, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/AuthPages.css"

interface BaseFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  role: "student" | "admin"
}

interface StudentFormData extends BaseFormData {
  role: "student"
  studentId: string
  department: string
}

interface AdminFormData extends BaseFormData {
  role: "admin"
  employeeId: string
  position: string
}

type FormData = StudentFormData | AdminFormData

interface FormErrors {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
  role?: string
  studentId?: string
  department?: string
  employeeId?: string
  position?: string
}

const RegisterPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    studentId: "",
    department: "",
  } as StudentFormData)

  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  // Reset role-specific fields when role changes
  useEffect(() => {
    if (formData.role === "student") {
      setFormData(
        (prev) =>
          ({
            ...prev,
            studentId: (prev as StudentFormData).studentId || "",
            department: (prev as StudentFormData).department || "",
          }) as StudentFormData,
      )
    } else {
      setFormData(
        (prev) =>
          ({
            ...prev,
            employeeId: (prev as AdminFormData).employeeId || "",
            position: (prev as AdminFormData).position || "",
          }) as AdminFormData,
      )
    }
  }, [formData.role])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name) {
      newErrors.name = "Name is required"
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (formData.role === "student") {
      if (!(formData as StudentFormData).studentId) {
        newErrors.studentId = "Student ID is required"
      }

      if (!(formData as StudentFormData).department) {
        newErrors.department = "Department is required"
      }
    } else {
      if (!(formData as AdminFormData).employeeId) {
        newErrors.employeeId = "Employee ID is required"
      }

      if (!(formData as AdminFormData).position) {
        newErrors.position = "Position is required"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Show success toast
      setToast({
        message: `Registered successfully as ${formData.role}`,
        type: "success",
      })

      // Redirect to login page
      setTimeout(() => {
        navigate("/login")
      }, 1000)
    } catch (error) {
      setToast({
        message: "Registration failed. Please try again.",
        type: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <Link to="/" className="back-link">
        ← Back
      </Link>

      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Register</h2>
          <p className="auth-description">Create a new account to access the system</p>
        </div>

        <div className="auth-content">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Role</label>
              <div className="radio-group">
                <label className="radio-item">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={formData.role === "student"}
                    onChange={handleChange}
                  />
                  Student
                </label>
                <label className="radio-item">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={formData.role === "admin"}
                    onChange={handleChange}
                  />
                  Administrator
                </label>
              </div>
              {errors.role && <div className="form-error">{errors.role}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="form-error">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="form-error">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <div className="form-error">{errors.password}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-input"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <div className="form-error">{errors.confirmPassword}</div>}
            </div>

            {formData.role === "student" && (
              <>
                <div className="form-group">
                  <label htmlFor="studentId" className="form-label">
                    Student ID
                  </label>
                  <input
                    type="text"
                    id="studentId"
                    name="studentId"
                    className="form-input"
                    placeholder="S12345"
                    value={(formData as StudentFormData).studentId}
                    onChange={handleChange}
                  />
                  {errors.studentId && <div className="form-error">{errors.studentId}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="department" className="form-label">
                    Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    className="select"
                    value={(formData as StudentFormData).department}
                    onChange={handleChange}
                  >
                    <option value="">Select a department</option>
                    <option value="computer-science">Computer Science</option>
                    <option value="engineering">Engineering</option>
                    <option value="business">Business</option>
                    <option value="arts">Arts & Humanities</option>
                    <option value="science">Science</option>
                  </select>
                  {errors.department && <div className="form-error">{errors.department}</div>}
                </div>
              </>
            )}

            {formData.role === "admin" && (
              <>
                <div className="form-group">
                  <label htmlFor="employeeId" className="form-label">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    id="employeeId"
                    name="employeeId"
                    className="form-input"
                    placeholder="E12345"
                    value={(formData as AdminFormData).employeeId}
                    onChange={handleChange}
                  />
                  {errors.employeeId && <div className="form-error">{errors.employeeId}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="position" className="form-label">
                    Position
                  </label>
                  <select
                    id="position"
                    name="position"
                    className="select"
                    value={(formData as AdminFormData).position}
                    onChange={handleChange}
                  >
                    <option value="">Select a position</option>
                    <option value="department-head">Department Head</option>
                    <option value="coordinator">Program Coordinator</option>
                    <option value="registrar">Registrar</option>
                    <option value="advisor">Academic Advisor</option>
                    <option value="it-admin">IT Administrator</option>
                  </select>
                  {errors.position && <div className="form-error">{errors.position}</div>}
                </div>
              </>
            )}

            <button type="submit" className="btn btn-block" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="link">
              Login
            </Link>
          </p>
        </div>
      </div>

      {toast && <div className={`toast ${toast.type === "error" ? "toast-error" : ""}`}>{toast.message}</div>}
    </div>
  )
}

export default RegisterPage
